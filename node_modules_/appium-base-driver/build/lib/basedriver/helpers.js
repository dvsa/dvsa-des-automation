"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureApp = configureApp;
exports.duplicateKeys = duplicateKeys;
exports.isPackageOrBundle = isPackageOrBundle;
exports.parseCapsArray = parseCapsArray;

require("source-map-support/register");

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _logger = _interopRequireDefault(require("./logger"));

var _appiumSupport = require("appium-support");

var _lruCache = _interopRequireDefault(require("lru-cache"));

var _asyncLock = _interopRequireDefault(require("async-lock"));

var _axios = _interopRequireDefault(require("axios"));

const IPA_EXT = '.ipa';
const ZIP_EXTS = ['.zip', IPA_EXT];
const ZIP_MIME_TYPES = ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip'];
const CACHED_APPS_MAX_AGE = 1000 * 60 * 60 * 24;
const APPLICATIONS_CACHE = new _lruCache.default({
  maxAge: CACHED_APPS_MAX_AGE,
  updateAgeOnGet: true,
  dispose: (app, {
    fullPath
  }) => {
    _logger.default.info(`The application '${app}' cached at '${fullPath}' has ` + `expired after ${CACHED_APPS_MAX_AGE}ms`);

    setTimeout(async () => {
      if (fullPath && (await _appiumSupport.fs.exists(fullPath))) {
        await _appiumSupport.fs.rimraf(fullPath);
      }
    });
  },
  noDisposeOnSet: true
});
const APPLICATIONS_CACHE_GUARD = new _asyncLock.default();
const SANITIZE_REPLACEMENT = '-';
const DEFAULT_BASENAME = 'appium-app';
const APP_DOWNLOAD_TIMEOUT_MS = 120 * 1000;
process.on('exit', () => {
  if (APPLICATIONS_CACHE.itemCount === 0) {
    return;
  }

  const appPaths = APPLICATIONS_CACHE.values().map(({
    fullPath
  }) => fullPath);

  _logger.default.debug(`Performing cleanup of ${appPaths.length} cached ` + _appiumSupport.util.pluralize('application', appPaths.length));

  for (const appPath of appPaths) {
    try {
      _appiumSupport.fs.rimrafSync(appPath);
    } catch (e) {
      _logger.default.warn(e.message);
    }
  }
});

async function retrieveHeaders(link) {
  try {
    return (await (0, _axios.default)({
      url: link,
      method: 'HEAD',
      timeout: 5000
    })).headers;
  } catch (e) {
    _logger.default.info(`Cannot send HEAD request to '${link}'. Original error: ${e.message}`);
  }

  return {};
}

function getCachedApplicationPath(link, currentAppProps = {}, cachedAppInfo = {}) {
  const refresh = () => {
    _logger.default.debug(`A fresh copy of the application is going to be downloaded from ${link}`);

    return null;
  };

  if (!_lodash.default.isPlainObject(cachedAppInfo) || !_lodash.default.isPlainObject(currentAppProps)) {
    return refresh();
  }

  const {
    lastModified: currentModified,
    immutable: currentImmutable,
    maxAge: currentMaxAge
  } = currentAppProps;
  const {
    lastModified,
    immutable,
    timestamp,
    fullPath
  } = cachedAppInfo;

  if (lastModified && currentModified) {
    if (currentModified.getTime() <= lastModified.getTime()) {
      _logger.default.debug(`The application at ${link} has not been modified since ${lastModified}`);

      return fullPath;
    }

    _logger.default.debug(`The application at ${link} has been modified since ${lastModified}`);

    return refresh();
  }

  if (immutable && currentImmutable) {
    _logger.default.debug(`The application at ${link} is immutable`);

    return fullPath;
  }

  if (currentMaxAge && timestamp) {
    const msLeft = timestamp + currentMaxAge * 1000 - Date.now();

    if (msLeft > 0) {
      _logger.default.debug(`The cached application '${_path.default.basename(fullPath)}' will expire in ${msLeft / 1000}s`);

      return fullPath;
    }

    _logger.default.debug(`The cached application '${_path.default.basename(fullPath)}' has expired`);
  }

  return refresh();
}

function verifyAppExtension(app, supportedAppExtensions) {
  if (supportedAppExtensions.includes(_path.default.extname(app))) {
    return app;
  }

  throw new Error(`New app path '${app}' did not have ` + `${_appiumSupport.util.pluralize('extension', supportedAppExtensions.length, false)}: ` + supportedAppExtensions);
}

async function calculateFolderIntegrity(folderPath) {
  return (await _appiumSupport.fs.glob('**/*', {
    cwd: folderPath,
    strict: false,
    nosort: true
  })).length;
}

async function calculateFileIntegrity(filePath) {
  return await _appiumSupport.fs.hash(filePath);
}

async function isAppIntegrityOk(currentPath, expectedIntegrity = {}) {
  if (!(await _appiumSupport.fs.exists(currentPath))) {
    return false;
  }

  const isDir = (await _appiumSupport.fs.stat(currentPath)).isDirectory();

  if (isDir && (await calculateFolderIntegrity(currentPath)) >= (expectedIntegrity === null || expectedIntegrity === void 0 ? void 0 : expectedIntegrity.folder)) {
    return true;
  }

  if (!isDir && (await calculateFileIntegrity(currentPath)) === (expectedIntegrity === null || expectedIntegrity === void 0 ? void 0 : expectedIntegrity.file)) {
    return true;
  }

  return false;
}

async function configureApp(app, supportedAppExtensions) {
  if (!_lodash.default.isString(app)) {
    return;
  }

  if (!_lodash.default.isArray(supportedAppExtensions)) {
    supportedAppExtensions = [supportedAppExtensions];
  }

  let newApp = app;
  let shouldUnzipApp = false;
  let archiveHash = null;
  const remoteAppProps = {
    lastModified: null,
    immutable: false,
    maxAge: null
  };

  const {
    protocol,
    pathname
  } = _url.default.parse(newApp);

  const isUrl = ['http:', 'https:'].includes(protocol);
  const cachedAppInfo = APPLICATIONS_CACHE.get(app);
  return await APPLICATIONS_CACHE_GUARD.acquire(app, async () => {
    if (isUrl) {
      _logger.default.info(`Using downloadable app '${newApp}'`);

      const headers = await retrieveHeaders(newApp);

      if (!_lodash.default.isEmpty(headers)) {
        if (headers['last-modified']) {
          remoteAppProps.lastModified = new Date(headers['last-modified']);
        }

        _logger.default.debug(`Last-Modified: ${headers['last-modified']}`);

        if (headers['cache-control']) {
          remoteAppProps.immutable = /\bimmutable\b/i.test(headers['cache-control']);
          const maxAgeMatch = /\bmax-age=(\d+)\b/i.exec(headers['cache-control']);

          if (maxAgeMatch) {
            remoteAppProps.maxAge = parseInt(maxAgeMatch[1], 10);
          }
        }

        _logger.default.debug(`Cache-Control: ${headers['cache-control']}`);
      }

      const cachedPath = getCachedApplicationPath(app, remoteAppProps, cachedAppInfo);

      if (cachedPath) {
        if (await isAppIntegrityOk(cachedPath, cachedAppInfo === null || cachedAppInfo === void 0 ? void 0 : cachedAppInfo.integrity)) {
          _logger.default.info(`Reusing previously downloaded application at '${cachedPath}'`);

          return verifyAppExtension(cachedPath, supportedAppExtensions);
        }

        _logger.default.info(`The application at '${cachedPath}' does not exist anymore ` + `or its integrity has been damaged. Deleting it from the internal cache`);

        APPLICATIONS_CACHE.del(app);
      }

      let fileName = null;

      const basename = _appiumSupport.fs.sanitizeName(_path.default.basename(decodeURIComponent(pathname)), {
        replacement: SANITIZE_REPLACEMENT
      });

      const extname = _path.default.extname(basename);

      if (ZIP_EXTS.includes(extname)) {
        fileName = basename;
        shouldUnzipApp = true;
      }

      if (headers['content-type']) {
        const ct = headers['content-type'];

        _logger.default.debug(`Content-Type: ${ct}`);

        if (ZIP_MIME_TYPES.some(mimeType => new RegExp(`\\b${_lodash.default.escapeRegExp(mimeType)}\\b`).test(ct))) {
          if (!fileName) {
            fileName = `${DEFAULT_BASENAME}.zip`;
          }

          shouldUnzipApp = true;
        }
      }

      if (headers['content-disposition'] && /^attachment/i.test(headers['content-disposition'])) {
        _logger.default.debug(`Content-Disposition: ${headers['content-disposition']}`);

        const match = /filename="([^"]+)/i.exec(headers['content-disposition']);

        if (match) {
          fileName = _appiumSupport.fs.sanitizeName(match[1], {
            replacement: SANITIZE_REPLACEMENT
          });
          shouldUnzipApp = shouldUnzipApp || ZIP_EXTS.includes(_path.default.extname(fileName));
        }
      }

      if (!fileName) {
        const resultingName = basename ? basename.substring(0, basename.length - extname.length) : DEFAULT_BASENAME;
        let resultingExt = extname;

        if (!supportedAppExtensions.includes(resultingExt)) {
          _logger.default.info(`The current file extension '${resultingExt}' is not supported. ` + `Defaulting to '${_lodash.default.first(supportedAppExtensions)}'`);

          resultingExt = _lodash.default.first(supportedAppExtensions);
        }

        fileName = `${resultingName}${resultingExt}`;
      }

      const targetPath = await _appiumSupport.tempDir.path({
        prefix: fileName,
        suffix: ''
      });
      newApp = await downloadApp(newApp, targetPath);
    } else if (await _appiumSupport.fs.exists(newApp)) {
      _logger.default.info(`Using local app '${newApp}'`);

      shouldUnzipApp = ZIP_EXTS.includes(_path.default.extname(newApp));
    } else {
      let errorMessage = `The application at '${newApp}' does not exist or is not accessible`;

      if (_lodash.default.isString(protocol) && protocol.length > 2) {
        errorMessage = `The protocol '${protocol}' used in '${newApp}' is not supported. ` + `Only http: and https: protocols are supported`;
      }

      throw new Error(errorMessage);
    }

    if (shouldUnzipApp) {
      const archivePath = newApp;
      archiveHash = await calculateFileIntegrity(archivePath);

      if (archiveHash === (cachedAppInfo === null || cachedAppInfo === void 0 ? void 0 : cachedAppInfo.archiveHash)) {
        const {
          fullPath
        } = cachedAppInfo;

        if (await isAppIntegrityOk(fullPath, cachedAppInfo === null || cachedAppInfo === void 0 ? void 0 : cachedAppInfo.integrity)) {
          if (archivePath !== app) {
            await _appiumSupport.fs.rimraf(archivePath);
          }

          _logger.default.info(`Will reuse previously cached application at '${fullPath}'`);

          return verifyAppExtension(fullPath, supportedAppExtensions);
        }

        _logger.default.info(`The application at '${fullPath}' does not exist anymore ` + `or its integrity has been damaged. Deleting it from the cache`);

        APPLICATIONS_CACHE.del(app);
      }

      const tmpRoot = await _appiumSupport.tempDir.openDir();

      try {
        newApp = await unzipApp(archivePath, tmpRoot, supportedAppExtensions);
      } finally {
        if (newApp !== archivePath && archivePath !== app) {
          await _appiumSupport.fs.rimraf(archivePath);
        }
      }

      _logger.default.info(`Unzipped local app to '${newApp}'`);
    } else if (!_path.default.isAbsolute(newApp)) {
      newApp = _path.default.resolve(process.cwd(), newApp);

      _logger.default.warn(`The current application path '${app}' is not absolute ` + `and has been rewritten to '${newApp}'. Consider using absolute paths rather than relative`);

      app = newApp;
    }

    verifyAppExtension(newApp, supportedAppExtensions);

    if (app !== newApp && (archiveHash || _lodash.default.values(remoteAppProps).some(Boolean))) {
      const cachedFullPath = cachedAppInfo === null || cachedAppInfo === void 0 ? void 0 : cachedAppInfo.fullPath;

      if (cachedFullPath && cachedFullPath !== newApp && (await _appiumSupport.fs.exists(cachedFullPath))) {
        await _appiumSupport.fs.rimraf(cachedFullPath);
      }

      const integrity = {};

      if ((await _appiumSupport.fs.stat(newApp)).isDirectory()) {
        integrity.folder = await calculateFolderIntegrity(newApp);
      } else {
        integrity.file = await calculateFileIntegrity(newApp);
      }

      APPLICATIONS_CACHE.set(app, { ...remoteAppProps,
        timestamp: Date.now(),
        archiveHash,
        integrity,
        fullPath: newApp
      });
    }

    return newApp;
  });
}

async function downloadApp(app, targetPath) {
  const {
    href
  } = _url.default.parse(app);

  try {
    await _appiumSupport.net.downloadFile(href, targetPath, {
      timeout: APP_DOWNLOAD_TIMEOUT_MS
    });
  } catch (err) {
    throw new Error(`Unable to download the app: ${err.message}`);
  }

  return targetPath;
}

async function unzipApp(zipPath, dstRoot, supportedAppExtensions) {
  await _appiumSupport.zip.assertValidZip(zipPath);

  if (!_lodash.default.isArray(supportedAppExtensions)) {
    supportedAppExtensions = [supportedAppExtensions];
  }

  const tmpRoot = await _appiumSupport.tempDir.openDir();

  try {
    _logger.default.debug(`Unzipping '${zipPath}'`);

    const timer = new _appiumSupport.timing.Timer().start();
    const useSystemUnzipEnv = process.env.APPIUM_PREFER_SYSTEM_UNZIP;
    const useSystemUnzip = _lodash.default.isEmpty(useSystemUnzipEnv) || !['0', 'false'].includes(_lodash.default.toLower(useSystemUnzipEnv));
    const extractionOpts = {
      useSystemUnzip
    };

    if (_path.default.extname(zipPath) === IPA_EXT) {
      _logger.default.debug(`Enforcing UTF-8 encoding on the extracted file names for '${_path.default.basename(zipPath)}'`);

      extractionOpts.fileNamesEncoding = 'utf8';
    }

    await _appiumSupport.zip.extractAllTo(zipPath, tmpRoot, extractionOpts);
    const globPattern = `**/*.+(${supportedAppExtensions.map(ext => ext.replace(/^\./, '')).join('|')})`;
    const sortedBundleItems = (await _appiumSupport.fs.glob(globPattern, {
      cwd: tmpRoot,
      strict: false
    })).sort((a, b) => a.split(_path.default.sep).length - b.split(_path.default.sep).length);

    if (_lodash.default.isEmpty(sortedBundleItems)) {
      _logger.default.errorAndThrow(`App unzipped OK, but we could not find any '${supportedAppExtensions}' ` + _appiumSupport.util.pluralize('bundle', supportedAppExtensions.length, false) + ` in it. Make sure your archive contains at least one package having ` + `'${supportedAppExtensions}' ${_appiumSupport.util.pluralize('extension', supportedAppExtensions.length, false)}`);
    }

    _logger.default.debug(`Extracted ${_appiumSupport.util.pluralize('bundle item', sortedBundleItems.length, true)} ` + `from '${zipPath}' in ${Math.round(timer.getDuration().asMilliSeconds)}ms: ${sortedBundleItems}`);

    const matchedBundle = _lodash.default.first(sortedBundleItems);

    _logger.default.info(`Assuming '${matchedBundle}' is the correct bundle`);

    const dstPath = _path.default.resolve(dstRoot, _path.default.basename(matchedBundle));

    await _appiumSupport.fs.mv(_path.default.resolve(tmpRoot, matchedBundle), dstPath, {
      mkdirp: true
    });
    return dstPath;
  } finally {
    await _appiumSupport.fs.rimraf(tmpRoot);
  }
}

function isPackageOrBundle(app) {
  return /^([a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+)+$/.test(app);
}

function duplicateKeys(input, firstKey, secondKey) {
  if (_lodash.default.isArray(input)) {
    return input.map(item => duplicateKeys(item, firstKey, secondKey));
  }

  if (_lodash.default.isPlainObject(input)) {
    const resultObj = {};

    for (let [key, value] of _lodash.default.toPairs(input)) {
      const recursivelyCalledValue = duplicateKeys(value, firstKey, secondKey);

      if (key === firstKey) {
        resultObj[secondKey] = recursivelyCalledValue;
      } else if (key === secondKey) {
        resultObj[firstKey] = recursivelyCalledValue;
      }

      resultObj[key] = recursivelyCalledValue;
    }

    return resultObj;
  }

  return input;
}

function parseCapsArray(cap) {
  if (_lodash.default.isArray(cap)) {
    return cap;
  }

  let parsedCaps;

  try {
    parsedCaps = JSON.parse(cap);

    if (_lodash.default.isArray(parsedCaps)) {
      return parsedCaps;
    }
  } catch (ign) {
    _logger.default.warn(`Failed to parse capability as JSON array`);
  }

  if (_lodash.default.isString(cap)) {
    return [cap];
  }

  throw new Error(`must provide a string or JSON Array; received ${cap}`);
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2hlbHBlcnMuanMiXSwibmFtZXMiOlsiSVBBX0VYVCIsIlpJUF9FWFRTIiwiWklQX01JTUVfVFlQRVMiLCJDQUNIRURfQVBQU19NQVhfQUdFIiwiQVBQTElDQVRJT05TX0NBQ0hFIiwiTFJVIiwibWF4QWdlIiwidXBkYXRlQWdlT25HZXQiLCJkaXNwb3NlIiwiYXBwIiwiZnVsbFBhdGgiLCJsb2dnZXIiLCJpbmZvIiwic2V0VGltZW91dCIsImZzIiwiZXhpc3RzIiwicmltcmFmIiwibm9EaXNwb3NlT25TZXQiLCJBUFBMSUNBVElPTlNfQ0FDSEVfR1VBUkQiLCJBc3luY0xvY2siLCJTQU5JVElaRV9SRVBMQUNFTUVOVCIsIkRFRkFVTFRfQkFTRU5BTUUiLCJBUFBfRE9XTkxPQURfVElNRU9VVF9NUyIsInByb2Nlc3MiLCJvbiIsIml0ZW1Db3VudCIsImFwcFBhdGhzIiwidmFsdWVzIiwibWFwIiwiZGVidWciLCJsZW5ndGgiLCJ1dGlsIiwicGx1cmFsaXplIiwiYXBwUGF0aCIsInJpbXJhZlN5bmMiLCJlIiwid2FybiIsIm1lc3NhZ2UiLCJyZXRyaWV2ZUhlYWRlcnMiLCJsaW5rIiwidXJsIiwibWV0aG9kIiwidGltZW91dCIsImhlYWRlcnMiLCJnZXRDYWNoZWRBcHBsaWNhdGlvblBhdGgiLCJjdXJyZW50QXBwUHJvcHMiLCJjYWNoZWRBcHBJbmZvIiwicmVmcmVzaCIsIl8iLCJpc1BsYWluT2JqZWN0IiwibGFzdE1vZGlmaWVkIiwiY3VycmVudE1vZGlmaWVkIiwiaW1tdXRhYmxlIiwiY3VycmVudEltbXV0YWJsZSIsImN1cnJlbnRNYXhBZ2UiLCJ0aW1lc3RhbXAiLCJnZXRUaW1lIiwibXNMZWZ0IiwiRGF0ZSIsIm5vdyIsInBhdGgiLCJiYXNlbmFtZSIsInZlcmlmeUFwcEV4dGVuc2lvbiIsInN1cHBvcnRlZEFwcEV4dGVuc2lvbnMiLCJpbmNsdWRlcyIsImV4dG5hbWUiLCJFcnJvciIsImNhbGN1bGF0ZUZvbGRlckludGVncml0eSIsImZvbGRlclBhdGgiLCJnbG9iIiwiY3dkIiwic3RyaWN0Iiwibm9zb3J0IiwiY2FsY3VsYXRlRmlsZUludGVncml0eSIsImZpbGVQYXRoIiwiaGFzaCIsImlzQXBwSW50ZWdyaXR5T2siLCJjdXJyZW50UGF0aCIsImV4cGVjdGVkSW50ZWdyaXR5IiwiaXNEaXIiLCJzdGF0IiwiaXNEaXJlY3RvcnkiLCJmb2xkZXIiLCJmaWxlIiwiY29uZmlndXJlQXBwIiwiaXNTdHJpbmciLCJpc0FycmF5IiwibmV3QXBwIiwic2hvdWxkVW56aXBBcHAiLCJhcmNoaXZlSGFzaCIsInJlbW90ZUFwcFByb3BzIiwicHJvdG9jb2wiLCJwYXRobmFtZSIsInBhcnNlIiwiaXNVcmwiLCJnZXQiLCJhY3F1aXJlIiwiaXNFbXB0eSIsInRlc3QiLCJtYXhBZ2VNYXRjaCIsImV4ZWMiLCJwYXJzZUludCIsImNhY2hlZFBhdGgiLCJpbnRlZ3JpdHkiLCJkZWwiLCJmaWxlTmFtZSIsInNhbml0aXplTmFtZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2VtZW50IiwiY3QiLCJzb21lIiwibWltZVR5cGUiLCJSZWdFeHAiLCJlc2NhcGVSZWdFeHAiLCJtYXRjaCIsInJlc3VsdGluZ05hbWUiLCJzdWJzdHJpbmciLCJyZXN1bHRpbmdFeHQiLCJmaXJzdCIsInRhcmdldFBhdGgiLCJ0ZW1wRGlyIiwicHJlZml4Iiwic3VmZml4IiwiZG93bmxvYWRBcHAiLCJlcnJvck1lc3NhZ2UiLCJhcmNoaXZlUGF0aCIsInRtcFJvb3QiLCJvcGVuRGlyIiwidW56aXBBcHAiLCJpc0Fic29sdXRlIiwicmVzb2x2ZSIsIkJvb2xlYW4iLCJjYWNoZWRGdWxsUGF0aCIsInNldCIsImhyZWYiLCJuZXQiLCJkb3dubG9hZEZpbGUiLCJlcnIiLCJ6aXBQYXRoIiwiZHN0Um9vdCIsInppcCIsImFzc2VydFZhbGlkWmlwIiwidGltZXIiLCJ0aW1pbmciLCJUaW1lciIsInN0YXJ0IiwidXNlU3lzdGVtVW56aXBFbnYiLCJlbnYiLCJBUFBJVU1fUFJFRkVSX1NZU1RFTV9VTlpJUCIsInVzZVN5c3RlbVVuemlwIiwidG9Mb3dlciIsImV4dHJhY3Rpb25PcHRzIiwiZmlsZU5hbWVzRW5jb2RpbmciLCJleHRyYWN0QWxsVG8iLCJnbG9iUGF0dGVybiIsImV4dCIsInJlcGxhY2UiLCJqb2luIiwic29ydGVkQnVuZGxlSXRlbXMiLCJzb3J0IiwiYSIsImIiLCJzcGxpdCIsInNlcCIsImVycm9yQW5kVGhyb3ciLCJNYXRoIiwicm91bmQiLCJnZXREdXJhdGlvbiIsImFzTWlsbGlTZWNvbmRzIiwibWF0Y2hlZEJ1bmRsZSIsImRzdFBhdGgiLCJtdiIsIm1rZGlycCIsImlzUGFja2FnZU9yQnVuZGxlIiwiZHVwbGljYXRlS2V5cyIsImlucHV0IiwiZmlyc3RLZXkiLCJzZWNvbmRLZXkiLCJpdGVtIiwicmVzdWx0T2JqIiwia2V5IiwidmFsdWUiLCJ0b1BhaXJzIiwicmVjdXJzaXZlbHlDYWxsZWRWYWx1ZSIsInBhcnNlQ2Fwc0FycmF5IiwiY2FwIiwicGFyc2VkQ2FwcyIsIkpTT04iLCJpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsTUFBTUEsT0FBTyxHQUFHLE1BQWhCO0FBQ0EsTUFBTUMsUUFBUSxHQUFHLENBQUMsTUFBRCxFQUFTRCxPQUFULENBQWpCO0FBQ0EsTUFBTUUsY0FBYyxHQUFHLENBQ3JCLGlCQURxQixFQUVyQiw4QkFGcUIsRUFHckIsaUJBSHFCLENBQXZCO0FBS0EsTUFBTUMsbUJBQW1CLEdBQUcsT0FBTyxFQUFQLEdBQVksRUFBWixHQUFpQixFQUE3QztBQUNBLE1BQU1DLGtCQUFrQixHQUFHLElBQUlDLGlCQUFKLENBQVE7QUFDakNDLEVBQUFBLE1BQU0sRUFBRUgsbUJBRHlCO0FBRWpDSSxFQUFBQSxjQUFjLEVBQUUsSUFGaUI7QUFHakNDLEVBQUFBLE9BQU8sRUFBRSxDQUFDQyxHQUFELEVBQU07QUFBQ0MsSUFBQUE7QUFBRCxH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QkFBT3lCLElBQVAsQ0FBYSwwQ0FBYjtBQUNEOztBQUNELE1BQUlZLGdCQUFFcUMsUUFBRixDQUFXb0csR0FBWCxDQUFKLEVBQXFCO0FBQ25CLFdBQU8sQ0FBQ0EsR0FBRCxDQUFQO0FBQ0Q7O0FBQ0QsUUFBTSxJQUFJdkgsS0FBSixDQUFXLGlEQUFnRHVILEdBQUksRUFBL0QsQ0FBTjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyB0ZW1wRGlyLCBmcywgdXRpbCwgemlwLCBuZXQsIHRpbWluZyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBMUlUgZnJvbSAnbHJ1LWNhY2hlJztcbmltcG9ydCBBc3luY0xvY2sgZnJvbSAnYXN5bmMtbG9jayc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBJUEFfRVhUID0gJy5pcGEnO1xuY29uc3QgWklQX0VYVFMgPSBbJy56aXAnLCBJUEFfRVhUXTtcbmNvbnN0IFpJUF9NSU1FX1RZUEVTID0gW1xuICAnYXBwbGljYXRpb24vemlwJyxcbiAgJ2FwcGxpY2F0aW9uL3gtemlwLWNvbXByZXNzZWQnLFxuICAnbXVsdGlwYXJ0L3gtemlwJyxcbl07XG5jb25zdCBDQUNIRURfQVBQU19NQVhfQUdFID0gMTAwMCAqIDYwICogNjAgKiAyNDsgLy8gbXNcbmNvbnN0IEFQUExJQ0FUSU9OU19DQUNIRSA9IG5ldyBMUlUoe1xuICBtYXhBZ2U6IENBQ0hFRF9BUFBTX01BWF9BR0UsIC8vIGV4cGlyZSBhZnRlciAyNCBob3Vyc1xuICB1cGRhdGVBZ2VPbkdldDogdHJ1ZSxcbiAgZGlzcG9zZTogKGFwcCwge2Z1bGxQYXRofSkgPT4ge1xuICAgIGxvZ2dlci5pbmZvKGBUaGUgYXBwbGljYXRpb24gJyR7YXBwfScgY2FjaGVkIGF0ICcke2Z1bGxQYXRofScgaGFzIGAgK1xuICAgICAgYGV4cGlyZWQgYWZ0ZXIgJHtDQUNIRURfQVBQU19NQVhfQUdFfW1zYCk7XG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoZnVsbFBhdGggJiYgYXdhaXQgZnMuZXhpc3RzKGZ1bGxQYXRoKSkge1xuICAgICAgICBhd2FpdCBmcy5yaW1yYWYoZnVsbFBhdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBub0Rpc3Bvc2VPblNldDogdHJ1ZSxcbn0pO1xuY29uc3QgQVBQTElDQVRJT05TX0NBQ0hFX0dVQVJEID0gbmV3IEFzeW5jTG9jaygpO1xuY29uc3QgU0FOSVRJWkVfUkVQTEFDRU1FTlQgPSAnLSc7XG5jb25zdCBERUZBVUxUX0JBU0VOQU1FID0gJ2FwcGl1bS1hcHAnO1xuY29uc3QgQVBQX0RPV05MT0FEX1RJTUVPVVRfTVMgPSAxMjAgKiAxMDAwO1xuXG5wcm9jZXNzLm9uKCdleGl0JywgKCkgPT4ge1xuICBpZiAoQVBQTElDQVRJT05TX0NBQ0hFLml0ZW1Db3VudCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGFwcFBhdGhzID0gQVBQTElDQVRJT05TX0NBQ0hFLnZhbHVlcygpXG4gICAgLm1hcCgoe2Z1bGxQYXRofSkgPT4gZnVsbFBhdGgpO1xuICBsb2dnZXIuZGVidWcoYFBlcmZvcm1pbmcgY2xlYW51cCBvZiAke2FwcFBhdGhzLmxlbmd0aH0gY2FjaGVkIGAgK1xuICAgIHV0aWwucGx1cmFsaXplKCdhcHBsaWNhdGlvbicsIGFwcFBhdGhzLmxlbmd0aCkpO1xuICBmb3IgKGNvbnN0IGFwcFBhdGggb2YgYXBwUGF0aHMpIHtcbiAgICB0cnkge1xuICAgICAgLy8gQXN5bmNocm9ub3VzIGNhbGxzIGFyZSBub3Qgc3VwcG9ydGVkIGluIG9uRXhpdCBoYW5kbGVyXG4gICAgICBmcy5yaW1yYWZTeW5jKGFwcFBhdGgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci53YXJuKGUubWVzc2FnZSk7XG4gICAgfVxuICB9XG59KTtcblxuXG5hc3luYyBmdW5jdGlvbiByZXRyaWV2ZUhlYWRlcnMgKGxpbmspIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gKGF3YWl0IGF4aW9zKHtcbiAgICAgIHVybDogbGluayxcbiAgICAgIG1ldGhvZDogJ0hFQUQnLFxuICAgICAgdGltZW91dDogNTAwMCxcbiAgICB9KSkuaGVhZGVycztcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5pbmZvKGBDYW5ub3Qgc2VuZCBIRUFEIHJlcXVlc3QgdG8gJyR7bGlua30nLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbiAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBnZXRDYWNoZWRBcHBsaWNhdGlvblBhdGggKGxpbmssIGN1cnJlbnRBcHBQcm9wcyA9IHt9LCBjYWNoZWRBcHBJbmZvID0ge30pIHtcbiAgY29uc3QgcmVmcmVzaCA9ICgpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoYEEgZnJlc2ggY29weSBvZiB0aGUgYXBwbGljYXRpb24gaXMgZ29pbmcgdG8gYmUgZG93bmxvYWRlZCBmcm9tICR7bGlua31gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBpZiAoIV8uaXNQbGFpbk9iamVjdChjYWNoZWRBcHBJbmZvKSB8fCAhXy5pc1BsYWluT2JqZWN0KGN1cnJlbnRBcHBQcm9wcykpIHtcbiAgICByZXR1cm4gcmVmcmVzaCgpO1xuICB9XG5cbiAgY29uc3Qge1xuICAgIGxhc3RNb2RpZmllZDogY3VycmVudE1vZGlmaWVkLFxuICAgIGltbXV0YWJsZTogY3VycmVudEltbXV0YWJsZSxcbiAgICAvLyBtYXhBZ2UgaXMgaW4gc2Vjb25kc1xuICAgIG1heEFnZTogY3VycmVudE1heEFnZSxcbiAgfSA9IGN1cnJlbnRBcHBQcm9wcztcbiAgY29uc3Qge1xuICAgIC8vIERhdGUgaW5zdGFuY2VcbiAgICBsYXN0TW9kaWZpZWQsXG4gICAgLy8gYm9vbGVhblxuICAgIGltbXV0YWJsZSxcbiAgICAvLyBVbml4IHRpbWUgaW4gbWlsbGlzZWNvbmRzXG4gICAgdGltZXN0YW1wLFxuICAgIGZ1bGxQYXRoLFxuICB9ID0gY2FjaGVkQXBwSW5mbztcbiAgaWYgKGxhc3RNb2RpZmllZCAmJiBjdXJyZW50TW9kaWZpZWQpIHtcbiAgICBpZiAoY3VycmVudE1vZGlmaWVkLmdldFRpbWUoKSA8PSBsYXN0TW9kaWZpZWQuZ2V0VGltZSgpKSB7XG4gICAgICBsb2dnZXIuZGVidWcoYFRoZSBhcHBsaWNhdGlvbiBhdCAke2xpbmt9IGhhcyBub3QgYmVlbiBtb2RpZmllZCBzaW5jZSAke2xhc3RNb2RpZmllZH1gKTtcbiAgICAgIHJldHVybiBmdWxsUGF0aDtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaGUgYXBwbGljYXRpb24gYXQgJHtsaW5rfSBoYXMgYmVlbiBtb2RpZmllZCBzaW5jZSAke2xhc3RNb2RpZmllZH1gKTtcbiAgICByZXR1cm4gcmVmcmVzaCgpO1xuICB9XG4gIGlmIChpbW11dGFibGUgJiYgY3VycmVudEltbXV0YWJsZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgVGhlIGFwcGxpY2F0aW9uIGF0ICR7bGlua30gaXMgaW1tdXRhYmxlYCk7XG4gICAgcmV0dXJuIGZ1bGxQYXRoO1xuICB9XG4gIGlmIChjdXJyZW50TWF4QWdlICYmIHRpbWVzdGFtcCkge1xuICAgIGNvbnN0IG1zTGVmdCA9IHRpbWVzdGFtcCArIGN1cnJlbnRNYXhBZ2UgKiAxMDAwIC0gRGF0ZS5ub3coKTtcbiAgICBpZiAobXNMZWZ0ID4gMCkge1xuICAgICAgbG9nZ2VyLmRlYnVnKGBUaGUgY2FjaGVkIGFwcGxpY2F0aW9uICcke3BhdGguYmFzZW5hbWUoZnVsbFBhdGgpfScgd2lsbCBleHBpcmUgaW4gJHttc0xlZnQgLyAxMDAwfXNgKTtcbiAgICAgIHJldHVybiBmdWxsUGF0aDtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaGUgY2FjaGVkIGFwcGxpY2F0aW9uICcke3BhdGguYmFzZW5hbWUoZnVsbFBhdGgpfScgaGFzIGV4cGlyZWRgKTtcbiAgfVxuICByZXR1cm4gcmVmcmVzaCgpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlBcHBFeHRlbnNpb24gKGFwcCwgc3VwcG9ydGVkQXBwRXh0ZW5zaW9ucykge1xuICBpZiAoc3VwcG9ydGVkQXBwRXh0ZW5zaW9ucy5pbmNsdWRlcyhwYXRoLmV4dG5hbWUoYXBwKSkpIHtcbiAgICByZXR1cm4gYXBwO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgTmV3IGFwcCBwYXRoICcke2FwcH0nIGRpZCBub3QgaGF2ZSBgICtcbiAgICBgJHt1dGlsLnBsdXJhbGl6ZSgnZXh0ZW5zaW9uJywgc3VwcG9ydGVkQXBwRXh0ZW5zaW9ucy5sZW5ndGgsIGZhbHNlKX06IGAgK1xuICAgIHN1cHBvcnRlZEFwcEV4dGVuc2lvbnMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjYWxjdWxhdGVGb2xkZXJJbnRlZ3JpdHkgKGZvbGRlclBhdGgpIHtcbiAgcmV0dXJuIChhd2FpdCBmcy5nbG9iKCcqKi8qJywge2N3ZDogZm9sZGVyUGF0aCwgc3RyaWN0OiBmYWxzZSwgbm9zb3J0OiB0cnVlfSkpLmxlbmd0aDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2FsY3VsYXRlRmlsZUludGVncml0eSAoZmlsZVBhdGgpIHtcbiAgcmV0dXJuIGF3YWl0IGZzLmhhc2goZmlsZVBhdGgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpc0FwcEludGVncml0eU9rIChjdXJyZW50UGF0aCwgZXhwZWN0ZWRJbnRlZ3JpdHkgPSB7fSkge1xuICBpZiAoIWF3YWl0IGZzLmV4aXN0cyhjdXJyZW50UGF0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBpc0RpciA9IChhd2FpdCBmcy5zdGF0KGN1cnJlbnRQYXRoKSkuaXNEaXJlY3RvcnkoKTtcbiAgLy8gRm9sZGVyIGludGVncml0eSBjaGVjayBpcyBzaW1wbGU6XG4gIC8vIFZlcmlmeSB0aGUgcHJldmlvdXMgYW1vdW50IG9mIGZpbGVzIGlzIG5vdCBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgb25lLlxuICAvLyBXZSBkb24ndCB3YW50IHRvIHVzZSBlcXVhbGl0eSBjb21wYXJpc29uIGJlY2F1c2Ugb2YgYW4gYXNzdW1wdGlvbiB0aGF0IHRoZSBPUyBtaWdodFxuICAvLyBjcmVhdGUgc29tZSB1bndhbnRlZCBzZXJ2aWNlIGZpbGVzL2NhY2hlZCBpbnNpZGUgb2YgdGhhdCBmb2xkZXIgb3IgaXRzIHN1YmZvbGRlcnMuXG4gIC8vIE9mYywgdmFsaWRhdGluZyB0aGUgaGFzaCBzdW0gb2YgZWFjaCBmaWxlIChvciBhdCBsZWFzdCBvZiBmaWxlIHBhdGgpIHdvdWxkIGJlIG11Y2hcbiAgLy8gbW9yZSBwcmVjaXNlLCBidXQgd2UgZG9uJ3QgbmVlZCB0byBiZSB2ZXJ5IHByZWNpc2UgaGVyZSBhbmQgYWxzbyBkb24ndCB3YW50IHRvXG4gIC8vIG92ZXJ1c2UgUkFNIGFuZCBoYXZlIGEgcGVyZm9ybWFuY2UgZHJvcC5cbiAgaWYgKGlzRGlyICYmIGF3YWl0IGNhbGN1bGF0ZUZvbGRlckludGVncml0eShjdXJyZW50UGF0aCkgPj0gZXhwZWN0ZWRJbnRlZ3JpdHk/LmZvbGRlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICghaXNEaXIgJiYgYXdhaXQgY2FsY3VsYXRlRmlsZUludGVncml0eShjdXJyZW50UGF0aCkgPT09IGV4cGVjdGVkSW50ZWdyaXR5Py5maWxlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb25maWd1cmVBcHAgKGFwcCwgc3VwcG9ydGVkQXBwRXh0ZW5zaW9ucykge1xuICBpZiAoIV8uaXNTdHJpbmcoYXBwKSkge1xuICAgIC8vIGltbWVkaWF0ZWx5IHNob3J0Y2lyY3VpdCBpZiBub3QgZ2l2ZW4gYW4gYXBwXG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghXy5pc0FycmF5KHN1cHBvcnRlZEFwcEV4dGVuc2lvbnMpKSB7XG4gICAgc3VwcG9ydGVkQXBwRXh0ZW5zaW9ucyA9IFtzdXBwb3J0ZWRBcHBFeHRlbnNpb25zXTtcbiAgfVxuXG4gIGxldCBuZXdBcHAgPSBhcHA7XG4gIGxldCBzaG91bGRVbnppcEFwcCA9IGZhbHNlO1xuICBsZXQgYXJjaGl2ZUhhc2ggPSBudWxsO1xuICBjb25zdCByZW1vdGVBcHBQcm9wcyA9IHtcbiAgICBsYXN0TW9kaWZpZWQ6IG51bGwsXG4gICAgaW1tdXRhYmxlOiBmYWxzZSxcbiAgICBtYXhBZ2U6IG51bGwsXG4gIH07XG4gIGNvbnN0IHtwcm90b2NvbCwgcGF0aG5hbWV9ID0gdXJsLnBhcnNlKG5ld0FwcCk7XG4gIGNvbnN0IGlzVXJsID0gWydodHRwOicsICdodHRwczonXS5pbmNsdWRlcyhwcm90b2NvbCk7XG5cbiAgY29uc3QgY2FjaGVkQXBwSW5mbyA9IEFQUExJQ0FUSU9OU19DQUNIRS5nZXQoYXBwKTtcblxuICByZXR1cm4gYXdhaXQgQVBQTElDQVRJT05TX0NBQ0hFX0dVQVJELmFjcXVpcmUoYXBwLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGlzVXJsKSB7XG4gICAgICAvLyBVc2UgdGhlIGFwcCBmcm9tIHJlbW90ZSBVUkxcbiAgICAgIGxvZ2dlci5pbmZvKGBVc2luZyBkb3dubG9hZGFibGUgYXBwICcke25ld0FwcH0nYCk7XG4gICAgICBjb25zdCBoZWFkZXJzID0gYXdhaXQgcmV0cmlldmVIZWFkZXJzKG5ld0FwcCk7XG4gICAgICBpZiAoIV8uaXNFbXB0eShoZWFkZXJzKSkge1xuICAgICAgICBpZiAoaGVhZGVyc1snbGFzdC1tb2RpZmllZCddKSB7XG4gICAgICAgICAgcmVtb3RlQXBwUHJvcHMubGFzdE1vZGlmaWVkID0gbmV3IERhdGUoaGVhZGVyc1snbGFzdC1tb2RpZmllZCddKTtcbiAgICAgICAgfVxuICAgICAgICBsb2dnZXIuZGVidWcoYExhc3QtTW9kaWZpZWQ6ICR7aGVhZGVyc1snbGFzdC1tb2RpZmllZCddfWApO1xuICAgICAgICBpZiAoaGVhZGVyc1snY2FjaGUtY29udHJvbCddKSB7XG4gICAgICAgICAgcmVtb3RlQXBwUHJvcHMuaW1tdXRhYmxlID0gL1xcYmltbXV0YWJsZVxcYi9pLnRlc3QoaGVhZGVyc1snY2FjaGUtY29udHJvbCddKTtcbiAgICAgICAgICBjb25zdCBtYXhBZ2VNYXRjaCA9IC9cXGJtYXgtYWdlPShcXGQrKVxcYi9pLmV4ZWMoaGVhZGVyc1snY2FjaGUtY29udHJvbCddKTtcbiAgICAgICAgICBpZiAobWF4QWdlTWF0Y2gpIHtcbiAgICAgICAgICAgIHJlbW90ZUFwcFByb3BzLm1heEFnZSA9IHBhcnNlSW50KG1heEFnZU1hdGNoWzFdLCAxMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ2FjaGUtQ29udHJvbDogJHtoZWFkZXJzWydjYWNoZS1jb250cm9sJ119YCk7XG4gICAgICB9XG4gICAgICBjb25zdCBjYWNoZWRQYXRoID0gZ2V0Q2FjaGVkQXBwbGljYXRpb25QYXRoKGFwcCwgcmVtb3RlQXBwUHJvcHMsIGNhY2hlZEFwcEluZm8pO1xuICAgICAgaWYgKGNhY2hlZFBhdGgpIHtcbiAgICAgICAgaWYgKGF3YWl0IGlzQXBwSW50ZWdyaXR5T2soY2FjaGVkUGF0aCwgY2FjaGVkQXBwSW5mbz8uaW50ZWdyaXR5KSkge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBSZXVzaW5nIHByZXZpb3VzbHkgZG93bmxvYWRlZCBhcHBsaWNhdGlvbiBhdCAnJHtjYWNoZWRQYXRofSdgKTtcbiAgICAgICAgICByZXR1cm4gdmVyaWZ5QXBwRXh0ZW5zaW9uKGNhY2hlZFBhdGgsIHN1cHBvcnRlZEFwcEV4dGVuc2lvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlci5pbmZvKGBUaGUgYXBwbGljYXRpb24gYXQgJyR7Y2FjaGVkUGF0aH0nIGRvZXMgbm90IGV4aXN0IGFueW1vcmUgYCArXG4gICAgICAgICAgYG9yIGl0cyBpbnRlZ3JpdHkgaGFzIGJlZW4gZGFtYWdlZC4gRGVsZXRpbmcgaXQgZnJvbSB0aGUgaW50ZXJuYWwgY2FjaGVgKTtcbiAgICAgICAgQVBQTElDQVRJT05TX0NBQ0hFLmRlbChhcHApO1xuICAgICAgfVxuXG4gICAgICBsZXQgZmlsZU5hbWUgPSBudWxsO1xuICAgICAgY29uc3QgYmFzZW5hbWUgPSBmcy5zYW5pdGl6ZU5hbWUocGF0aC5iYXNlbmFtZShkZWNvZGVVUklDb21wb25lbnQocGF0aG5hbWUpKSwge1xuICAgICAgICByZXBsYWNlbWVudDogU0FOSVRJWkVfUkVQTEFDRU1FTlRcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZXh0bmFtZSA9IHBhdGguZXh0bmFtZShiYXNlbmFtZSk7XG4gICAgICAvLyB0byBkZXRlcm1pbmUgaWYgd2UgbmVlZCB0byB1bnppcCB0aGUgYXBwLCB3ZSBoYXZlIGEgbnVtYmVyIG9mIHBsYWNlc1xuICAgICAgLy8gdG8gbG9vazogY29udGVudCB0eXBlLCBjb250ZW50IGRpc3Bvc2l0aW9uLCBvciB0aGUgZmlsZSBleHRlbnNpb25cbiAgICAgIGlmIChaSVBfRVhUUy5pbmNsdWRlcyhleHRuYW1lKSkge1xuICAgICAgICBmaWxlTmFtZSA9IGJhc2VuYW1lO1xuICAgICAgICBzaG91bGRVbnppcEFwcCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoaGVhZGVyc1snY29udGVudC10eXBlJ10pIHtcbiAgICAgICAgY29uc3QgY3QgPSBoZWFkZXJzWydjb250ZW50LXR5cGUnXTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBDb250ZW50LVR5cGU6ICR7Y3R9YCk7XG4gICAgICAgIC8vIHRoZSBmaWxldHlwZSBtYXkgbm90IGJlIG9idmlvdXMgZm9yIGNlcnRhaW4gdXJscywgc28gY2hlY2sgdGhlIG1pbWUgdHlwZSB0b29cbiAgICAgICAgaWYgKFpJUF9NSU1FX1RZUEVTLnNvbWUoKG1pbWVUeXBlKSA9PiBuZXcgUmVnRXhwKGBcXFxcYiR7Xy5lc2NhcGVSZWdFeHAobWltZVR5cGUpfVxcXFxiYCkudGVzdChjdCkpKSB7XG4gICAgICAgICAgaWYgKCFmaWxlTmFtZSkge1xuICAgICAgICAgICAgZmlsZU5hbWUgPSBgJHtERUZBVUxUX0JBU0VOQU1FfS56aXBgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzaG91bGRVbnppcEFwcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChoZWFkZXJzWydjb250ZW50LWRpc3Bvc2l0aW9uJ10gJiYgL15hdHRhY2htZW50L2kudGVzdChoZWFkZXJzWydjb250ZW50LWRpc3Bvc2l0aW9uJ10pKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ29udGVudC1EaXNwb3NpdGlvbjogJHtoZWFkZXJzWydjb250ZW50LWRpc3Bvc2l0aW9uJ119YCk7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gL2ZpbGVuYW1lPVwiKFteXCJdKykvaS5leGVjKGhlYWRlcnNbJ2NvbnRlbnQtZGlzcG9zaXRpb24nXSk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgIGZpbGVOYW1lID0gZnMuc2FuaXRpemVOYW1lKG1hdGNoWzFdLCB7XG4gICAgICAgICAgICByZXBsYWNlbWVudDogU0FOSVRJWkVfUkVQTEFDRU1FTlRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzaG91bGRVbnppcEFwcCA9IHNob3VsZFVuemlwQXBwIHx8IFpJUF9FWFRTLmluY2x1ZGVzKHBhdGguZXh0bmFtZShmaWxlTmFtZSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWZpbGVOYW1lKSB7XG4gICAgICAgIC8vIGFzc2lnbiB0aGUgZGVmYXVsdCBmaWxlIG5hbWUgYW5kIHRoZSBleHRlbnNpb24gaWYgbm9uZSBoYXMgYmVlbiBkZXRlY3RlZFxuICAgICAgICBjb25zdCByZXN1bHRpbmdOYW1lID0gYmFzZW5hbWVcbiAgICAgICAgICA/IGJhc2VuYW1lLnN1YnN0cmluZygwLCBiYXNlbmFtZS5sZW5ndGggLSBleHRuYW1lLmxlbmd0aClcbiAgICAgICAgICA6IERFRkFVTFRfQkFTRU5BTUU7XG4gICAgICAgIGxldCByZXN1bHRpbmdFeHQgPSBleHRuYW1lO1xuICAgICAgICBpZiAoIXN1cHBvcnRlZEFwcEV4dGVuc2lvbnMuaW5jbHVkZXMocmVzdWx0aW5nRXh0KSkge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBUaGUgY3VycmVudCBmaWxlIGV4dGVuc2lvbiAnJHtyZXN1bHRpbmdFeHR9JyBpcyBub3Qgc3VwcG9ydGVkLiBgICtcbiAgICAgICAgICAgIGBEZWZhdWx0aW5nIHRvICcke18uZmlyc3Qoc3VwcG9ydGVkQXBwRXh0ZW5zaW9ucyl9J2ApO1xuICAgICAgICAgIHJlc3VsdGluZ0V4dCA9IF8uZmlyc3Qoc3VwcG9ydGVkQXBwRXh0ZW5zaW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZmlsZU5hbWUgPSBgJHtyZXN1bHRpbmdOYW1lfSR7cmVzdWx0aW5nRXh0fWA7XG4gICAgICB9XG4gICAgICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgdGVtcERpci5wYXRoKHtcbiAgICAgICAgcHJlZml4OiBmaWxlTmFtZSxcbiAgICAgICAgc3VmZml4OiAnJyxcbiAgICAgIH0pO1xuICAgICAgbmV3QXBwID0gYXdhaXQgZG93bmxvYWRBcHAobmV3QXBwLCB0YXJnZXRQYXRoKTtcbiAgICB9IGVsc2UgaWYgKGF3YWl0IGZzLmV4aXN0cyhuZXdBcHApKSB7XG4gICAgICAvLyBVc2UgdGhlIGxvY2FsIGFwcFxuICAgICAgbG9nZ2VyLmluZm8oYFVzaW5nIGxvY2FsIGFwcCAnJHtuZXdBcHB9J2ApO1xuICAgICAgc2hvdWxkVW56aXBBcHAgPSBaSVBfRVhUUy5pbmNsdWRlcyhwYXRoLmV4dG5hbWUobmV3QXBwKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBgVGhlIGFwcGxpY2F0aW9uIGF0ICcke25ld0FwcH0nIGRvZXMgbm90IGV4aXN0IG9yIGlzIG5vdCBhY2Nlc3NpYmxlYDtcbiAgICAgIC8vIHByb3RvY29sIHZhbHVlIGZvciAnQzpcXFxcdGVtcCcgaXMgJ2M6Jywgc28gd2UgY2hlY2sgdGhlIGxlbmd0aCBhcyB3ZWxsXG4gICAgICBpZiAoXy5pc1N0cmluZyhwcm90b2NvbCkgJiYgcHJvdG9jb2wubGVuZ3RoID4gMikge1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBgVGhlIHByb3RvY29sICcke3Byb3RvY29sfScgdXNlZCBpbiAnJHtuZXdBcHB9JyBpcyBub3Qgc3VwcG9ydGVkLiBgICtcbiAgICAgICAgICBgT25seSBodHRwOiBhbmQgaHR0cHM6IHByb3RvY29scyBhcmUgc3VwcG9ydGVkYDtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVbnppcEFwcCkge1xuICAgICAgY29uc3QgYXJjaGl2ZVBhdGggPSBuZXdBcHA7XG4gICAgICBhcmNoaXZlSGFzaCA9IGF3YWl0IGNhbGN1bGF0ZUZpbGVJbnRlZ3JpdHkoYXJjaGl2ZVBhdGgpO1xuICAgICAgaWYgKGFyY2hpdmVIYXNoID09PSBjYWNoZWRBcHBJbmZvPy5hcmNoaXZlSGFzaCkge1xuICAgICAgICBjb25zdCB7ZnVsbFBhdGh9ID0gY2FjaGVkQXBwSW5mbztcbiAgICAgICAgaWYgKGF3YWl0IGlzQXBwSW50ZWdyaXR5T2soZnVsbFBhdGgsIGNhY2hlZEFwcEluZm8/LmludGVncml0eSkpIHtcbiAgICAgICAgICBpZiAoYXJjaGl2ZVBhdGggIT09IGFwcCkge1xuICAgICAgICAgICAgYXdhaXQgZnMucmltcmFmKGFyY2hpdmVQYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFdpbGwgcmV1c2UgcHJldmlvdXNseSBjYWNoZWQgYXBwbGljYXRpb24gYXQgJyR7ZnVsbFBhdGh9J2ApO1xuICAgICAgICAgIHJldHVybiB2ZXJpZnlBcHBFeHRlbnNpb24oZnVsbFBhdGgsIHN1cHBvcnRlZEFwcEV4dGVuc2lvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlci5pbmZvKGBUaGUgYXBwbGljYXRpb24gYXQgJyR7ZnVsbFBhdGh9JyBkb2VzIG5vdCBleGlzdCBhbnltb3JlIGAgK1xuICAgICAgICAgIGBvciBpdHMgaW50ZWdyaXR5IGhhcyBiZWVuIGRhbWFnZWQuIERlbGV0aW5nIGl0IGZyb20gdGhlIGNhY2hlYCk7XG4gICAgICAgIEFQUExJQ0FUSU9OU19DQUNIRS5kZWwoYXBwKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRtcFJvb3QgPSBhd2FpdCB0ZW1wRGlyLm9wZW5EaXIoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0FwcCA9IGF3YWl0IHVuemlwQXBwKGFyY2hpdmVQYXRoLCB0bXBSb290LCBzdXBwb3J0ZWRBcHBFeHRlbnNpb25zKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChuZXdBcHAgIT09IGFyY2hpdmVQYXRoICYmIGFyY2hpdmVQYXRoICE9PSBhcHApIHtcbiAgICAgICAgICBhd2FpdCBmcy5yaW1yYWYoYXJjaGl2ZVBhdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsb2dnZXIuaW5mbyhgVW56aXBwZWQgbG9jYWwgYXBwIHRvICcke25ld0FwcH0nYCk7XG4gICAgfSBlbHNlIGlmICghcGF0aC5pc0Fic29sdXRlKG5ld0FwcCkpIHtcbiAgICAgIG5ld0FwcCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBuZXdBcHApO1xuICAgICAgbG9nZ2VyLndhcm4oYFRoZSBjdXJyZW50IGFwcGxpY2F0aW9uIHBhdGggJyR7YXBwfScgaXMgbm90IGFic29sdXRlIGAgK1xuICAgICAgICBgYW5kIGhhcyBiZWVuIHJld3JpdHRlbiB0byAnJHtuZXdBcHB9Jy4gQ29uc2lkZXIgdXNpbmcgYWJzb2x1dGUgcGF0aHMgcmF0aGVyIHRoYW4gcmVsYXRpdmVgKTtcbiAgICAgIGFwcCA9IG5ld0FwcDtcbiAgICB9XG5cbiAgICB2ZXJpZnlBcHBFeHRlbnNpb24obmV3QXBwLCBzdXBwb3J0ZWRBcHBFeHRlbnNpb25zKTtcblxuICAgIGlmIChhcHAgIT09IG5ld0FwcCAmJiAoYXJjaGl2ZUhhc2ggfHwgXy52YWx1ZXMocmVtb3RlQXBwUHJvcHMpLnNvbWUoQm9vbGVhbikpKSB7XG4gICAgICBjb25zdCBjYWNoZWRGdWxsUGF0aCA9IGNhY2hlZEFwcEluZm8/LmZ1bGxQYXRoO1xuICAgICAgaWYgKGNhY2hlZEZ1bGxQYXRoICYmIGNhY2hlZEZ1bGxQYXRoICE9PSBuZXdBcHAgJiYgYXdhaXQgZnMuZXhpc3RzKGNhY2hlZEZ1bGxQYXRoKSkge1xuICAgICAgICBhd2FpdCBmcy5yaW1yYWYoY2FjaGVkRnVsbFBhdGgpO1xuICAgICAgfVxuICAgICAgY29uc3QgaW50ZWdyaXR5ID0ge307XG4gICAgICBpZiAoKGF3YWl0IGZzLnN0YXQobmV3QXBwKSkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBpbnRlZ3JpdHkuZm9sZGVyID0gYXdhaXQgY2FsY3VsYXRlRm9sZGVySW50ZWdyaXR5KG5ld0FwcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnRlZ3JpdHkuZmlsZSA9IGF3YWl0IGNhbGN1bGF0ZUZpbGVJbnRlZ3JpdHkobmV3QXBwKTtcbiAgICAgIH1cbiAgICAgIEFQUExJQ0FUSU9OU19DQUNIRS5zZXQoYXBwLCB7XG4gICAgICAgIC4uLnJlbW90ZUFwcFByb3BzLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIGFyY2hpdmVIYXNoLFxuICAgICAgICBpbnRlZ3JpdHksXG4gICAgICAgIGZ1bGxQYXRoOiBuZXdBcHAsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0FwcDtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkQXBwIChhcHAsIHRhcmdldFBhdGgpIHtcbiAgY29uc3Qge2hyZWZ9ID0gdXJsLnBhcnNlKGFwcCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgbmV0LmRvd25sb2FkRmlsZShocmVmLCB0YXJnZXRQYXRoLCB7XG4gICAgICB0aW1lb3V0OiBBUFBfRE9XTkxPQURfVElNRU9VVF9NUyxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gZG93bmxvYWQgdGhlIGFwcDogJHtlcnIubWVzc2FnZX1gKTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0UGF0aDtcbn1cblxuLyoqXG4gKiBFeHRyYWN0cyB0aGUgYnVuZGxlIGZyb20gYW4gYXJjaGl2ZSBpbnRvIHRoZSBnaXZlbiBmb2xkZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gemlwUGF0aCBGdWxsIHBhdGggdG8gdGhlIGFyY2hpdmUgY29udGFpbmluZyB0aGUgYnVuZGxlXG4gKiBAcGFyYW0ge3N0cmluZ30gZHN0Um9vdCBGdWxsIHBhdGggdG8gdGhlIGZvbGRlciB3aGVyZSB0aGUgZXh0cmFjdGVkIGJ1bmRsZVxuICogc2hvdWxkIGJlIHBsYWNlZFxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fHN0cmluZ30gc3VwcG9ydGVkQXBwRXh0ZW5zaW9ucyBUaGUgbGlzdCBvZiBleHRlbnNpb25zXG4gKiB0aGUgdGFyZ2V0IGFwcGxpY2F0aW9uIGJ1bmRsZSBzdXBwb3J0cywgZm9yIGV4YW1wbGUgWycuYXBrJywgJy5hcGtzJ10gZm9yXG4gKiBBbmRyb2lkIHBhY2thZ2VzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBGdWxsIHBhdGggdG8gdGhlIGJ1bmRsZSBpbiB0aGUgZGVzdGluYXRpb24gZm9sZGVyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGdpdmVuIGFyY2hpdmUgaXMgaW52YWxpZCBvciBubyBhcHBsaWNhdGlvbiBidW5kbGVzXG4gKiBoYXZlIGJlZW4gZm91bmQgaW5zaWRlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHVuemlwQXBwICh6aXBQYXRoLCBkc3RSb290LCBzdXBwb3J0ZWRBcHBFeHRlbnNpb25zKSB7XG4gIGF3YWl0IHppcC5hc3NlcnRWYWxpZFppcCh6aXBQYXRoKTtcblxuICBpZiAoIV8uaXNBcnJheShzdXBwb3J0ZWRBcHBFeHRlbnNpb25zKSkge1xuICAgIHN1cHBvcnRlZEFwcEV4dGVuc2lvbnMgPSBbc3VwcG9ydGVkQXBwRXh0ZW5zaW9uc107XG4gIH1cblxuICBjb25zdCB0bXBSb290ID0gYXdhaXQgdGVtcERpci5vcGVuRGlyKCk7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBVbnppcHBpbmcgJyR7emlwUGF0aH0nYCk7XG4gICAgY29uc3QgdGltZXIgPSBuZXcgdGltaW5nLlRpbWVyKCkuc3RhcnQoKTtcbiAgICBjb25zdCB1c2VTeXN0ZW1VbnppcEVudiA9IHByb2Nlc3MuZW52LkFQUElVTV9QUkVGRVJfU1lTVEVNX1VOWklQO1xuICAgIGNvbnN0IHVzZVN5c3RlbVVuemlwID0gXy5pc0VtcHR5KHVzZVN5c3RlbVVuemlwRW52KVxuICAgICAgfHwgIVsnMCcsICdmYWxzZSddLmluY2x1ZGVzKF8udG9Mb3dlcih1c2VTeXN0ZW1VbnppcEVudikpO1xuICAgIC8qKlxuICAgICAqIEF0dGVtcHQgdG8gdXNlIHVzZSB0aGUgc3lzdGVtIGB1bnppcGAgKGUuZy4sIGAvdXNyL2Jpbi91bnppcGApIGR1ZVxuICAgICAqIHRvIHRoZSBzaWduaWZpY2FudCBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudCBpdCBwcm92aWRlcyBvdmVyIHRoZSBuYXRpdmVcbiAgICAgKiBKUyBcInVuemlwXCIgaW1wbGVtZW50YXRpb24uXG4gICAgICogQHR5cGUge2ltcG9ydCgnYXBwaXVtLXN1cHBvcnQvbGliL3ppcCcpLkV4dHJhY3RBbGxPcHRpb25zfVxuICAgICAqL1xuICAgIGNvbnN0IGV4dHJhY3Rpb25PcHRzID0ge3VzZVN5c3RlbVVuemlwfTtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYXBwaXVtL2FwcGl1bS9pc3N1ZXMvMTQxMDBcbiAgICBpZiAocGF0aC5leHRuYW1lKHppcFBhdGgpID09PSBJUEFfRVhUKSB7XG4gICAgICBsb2dnZXIuZGVidWcoYEVuZm9yY2luZyBVVEYtOCBlbmNvZGluZyBvbiB0aGUgZXh0cmFjdGVkIGZpbGUgbmFtZXMgZm9yICcke3BhdGguYmFzZW5hbWUoemlwUGF0aCl9J2ApO1xuICAgICAgZXh0cmFjdGlvbk9wdHMuZmlsZU5hbWVzRW5jb2RpbmcgPSAndXRmOCc7XG4gICAgfVxuICAgIGF3YWl0IHppcC5leHRyYWN0QWxsVG8oemlwUGF0aCwgdG1wUm9vdCwgZXh0cmFjdGlvbk9wdHMpO1xuICAgIGNvbnN0IGdsb2JQYXR0ZXJuID0gYCoqLyouKygke3N1cHBvcnRlZEFwcEV4dGVuc2lvbnMubWFwKChleHQpID0+IGV4dC5yZXBsYWNlKC9eXFwuLywgJycpKS5qb2luKCd8Jyl9KWA7XG4gICAgY29uc3Qgc29ydGVkQnVuZGxlSXRlbXMgPSAoYXdhaXQgZnMuZ2xvYihnbG9iUGF0dGVybiwge1xuICAgICAgY3dkOiB0bXBSb290LFxuICAgICAgc3RyaWN0OiBmYWxzZSxcbiAgICAvLyBHZXQgdGhlIHRvcCBsZXZlbCBtYXRjaFxuICAgIH0pKS5zb3J0KChhLCBiKSA9PiBhLnNwbGl0KHBhdGguc2VwKS5sZW5ndGggLSBiLnNwbGl0KHBhdGguc2VwKS5sZW5ndGgpO1xuICAgIGlmIChfLmlzRW1wdHkoc29ydGVkQnVuZGxlSXRlbXMpKSB7XG4gICAgICBsb2dnZXIuZXJyb3JBbmRUaHJvdyhgQXBwIHVuemlwcGVkIE9LLCBidXQgd2UgY291bGQgbm90IGZpbmQgYW55ICcke3N1cHBvcnRlZEFwcEV4dGVuc2lvbnN9JyBgICtcbiAgICAgICAgdXRpbC5wbHVyYWxpemUoJ2J1bmRsZScsIHN1cHBvcnRlZEFwcEV4dGVuc2lvbnMubGVuZ3RoLCBmYWxzZSkgK1xuICAgICAgICBgIGluIGl0LiBNYWtlIHN1cmUgeW91ciBhcmNoaXZlIGNvbnRhaW5zIGF0IGxlYXN0IG9uZSBwYWNrYWdlIGhhdmluZyBgICtcbiAgICAgICAgYCcke3N1cHBvcnRlZEFwcEV4dGVuc2lvbnN9JyAke3V0aWwucGx1cmFsaXplKCdleHRlbnNpb24nLCBzdXBwb3J0ZWRBcHBFeHRlbnNpb25zLmxlbmd0aCwgZmFsc2UpfWApO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYEV4dHJhY3RlZCAke3V0aWwucGx1cmFsaXplKCdidW5kbGUgaXRlbScsIHNvcnRlZEJ1bmRsZUl0ZW1zLmxlbmd0aCwgdHJ1ZSl9IGAgK1xuICAgICAgYGZyb20gJyR7emlwUGF0aH0nIGluICR7TWF0aC5yb3VuZCh0aW1lci5nZXREdXJhdGlvbigpLmFzTWlsbGlTZWNvbmRzKX1tczogJHtzb3J0ZWRCdW5kbGVJdGVtc31gKTtcbiAgICBjb25zdCBtYXRjaGVkQnVuZGxlID0gXy5maXJzdChzb3J0ZWRCdW5kbGVJdGVtcyk7XG4gICAgbG9nZ2VyLmluZm8oYEFzc3VtaW5nICcke21hdGNoZWRCdW5kbGV9JyBpcyB0aGUgY29ycmVjdCBidW5kbGVgKTtcbiAgICBjb25zdCBkc3RQYXRoID0gcGF0aC5yZXNvbHZlKGRzdFJvb3QsIHBhdGguYmFzZW5hbWUobWF0Y2hlZEJ1bmRsZSkpO1xuICAgIGF3YWl0IGZzLm12KHBhdGgucmVzb2x2ZSh0bXBSb290LCBtYXRjaGVkQnVuZGxlKSwgZHN0UGF0aCwge21rZGlycDogdHJ1ZX0pO1xuICAgIHJldHVybiBkc3RQYXRoO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IGZzLnJpbXJhZih0bXBSb290KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1BhY2thZ2VPckJ1bmRsZSAoYXBwKSB7XG4gIHJldHVybiAoL14oW2EtekEtWjAtOVxcLV9dK1xcLlthLXpBLVowLTlcXC1fXSspKyQvKS50ZXN0KGFwcCk7XG59XG5cbi8qKlxuICogRmluZHMgYWxsIGluc3RhbmNlcyAnZmlyc3RLZXknIGFuZCBjcmVhdGUgYSBkdXBsaWNhdGUgd2l0aCB0aGUga2V5ICdzZWNvbmRLZXknLFxuICogRG8gdGhlIHNhbWUgdGhpbmcgaW4gcmV2ZXJzZS4gSWYgd2UgZmluZCAnc2Vjb25kS2V5JywgY3JlYXRlIGEgZHVwbGljYXRlIHdpdGggdGhlIGtleSAnZmlyc3RLZXknLlxuICpcbiAqIFRoaXMgd2lsbCBjYXVzZSBrZXlzIHRvIGJlIG92ZXJ3cml0dGVuIGlmIHRoZSBvYmplY3QgY29udGFpbnMgJ2ZpcnN0S2V5JyBhbmQgJ3NlY29uZEtleScuXG5cbiAqIEBwYXJhbSB7Kn0gaW5wdXQgQW55IHR5cGUgb2YgaW5wdXRcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaXJzdEtleSBUaGUgZmlyc3Qga2V5IHRvIGR1cGxpY2F0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHNlY29uZEtleSBUaGUgc2Vjb25kIGtleSB0byBkdXBsaWNhdGVcbiAqL1xuZnVuY3Rpb24gZHVwbGljYXRlS2V5cyAoaW5wdXQsIGZpcnN0S2V5LCBzZWNvbmRLZXkpIHtcbiAgLy8gSWYgYXJyYXkgcHJvdmlkZWQsIHJlY3Vyc2l2ZWx5IGNhbGwgb24gYWxsIGVsZW1lbnRzXG4gIGlmIChfLmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGlucHV0Lm1hcCgoaXRlbSkgPT4gZHVwbGljYXRlS2V5cyhpdGVtLCBmaXJzdEtleSwgc2Vjb25kS2V5KSk7XG4gIH1cblxuICAvLyBJZiBvYmplY3QsIGNyZWF0ZSBkdXBsaWNhdGVzIGZvciBrZXlzIGFuZCB0aGVuIHJlY3Vyc2l2ZWx5IGNhbGwgb24gdmFsdWVzXG4gIGlmIChfLmlzUGxhaW5PYmplY3QoaW5wdXQpKSB7XG4gICAgY29uc3QgcmVzdWx0T2JqID0ge307XG4gICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIF8udG9QYWlycyhpbnB1dCkpIHtcbiAgICAgIGNvbnN0IHJlY3Vyc2l2ZWx5Q2FsbGVkVmFsdWUgPSBkdXBsaWNhdGVLZXlzKHZhbHVlLCBmaXJzdEtleSwgc2Vjb25kS2V5KTtcbiAgICAgIGlmIChrZXkgPT09IGZpcnN0S2V5KSB7XG4gICAgICAgIHJlc3VsdE9ialtzZWNvbmRLZXldID0gcmVjdXJzaXZlbHlDYWxsZWRWYWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBzZWNvbmRLZXkpIHtcbiAgICAgICAgcmVzdWx0T2JqW2ZpcnN0S2V5XSA9IHJlY3Vyc2l2ZWx5Q2FsbGVkVmFsdWU7XG4gICAgICB9XG4gICAgICByZXN1bHRPYmpba2V5XSA9IHJlY3Vyc2l2ZWx5Q2FsbGVkVmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRPYmo7XG4gIH1cblxuICAvLyBCYXNlIGNhc2UuIFJldHVybiBwcmltaXRpdmVzIHdpdGhvdXQgZG9pbmcgYW55dGhpbmcuXG4gIHJldHVybiBpbnB1dDtcbn1cblxuLyoqXG4gKiBUYWtlcyBhIGRlc2lyZWQgY2FwYWJpbGl0eSBhbmQgdHJpZXMgdG8gSlNPTi5wYXJzZSBpdCBhcyBhbiBhcnJheSxcbiAqIGFuZCBlaXRoZXIgcmV0dXJucyB0aGUgcGFyc2VkIGFycmF5IG9yIGEgc2luZ2xldG9uIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PFN0cmluZz59IGNhcCBBIGRlc2lyZWQgY2FwYWJpbGl0eVxuICovXG5mdW5jdGlvbiBwYXJzZUNhcHNBcnJheSAoY2FwKSB7XG4gIGlmIChfLmlzQXJyYXkoY2FwKSkge1xuICAgIHJldHVybiBjYXA7XG4gIH1cblxuICBsZXQgcGFyc2VkQ2FwcztcbiAgdHJ5IHtcbiAgICBwYXJzZWRDYXBzID0gSlNPTi5wYXJzZShjYXApO1xuICAgIGlmIChfLmlzQXJyYXkocGFyc2VkQ2FwcykpIHtcbiAgICAgIHJldHVybiBwYXJzZWRDYXBzO1xuICAgIH1cbiAgfSBjYXRjaCAoaWduKSB7XG4gICAgbG9nZ2VyLndhcm4oYEZhaWxlZCB0byBwYXJzZSBjYXBhYmlsaXR5IGFzIEpTT04gYXJyYXlgKTtcbiAgfVxuICBpZiAoXy5pc1N0cmluZyhjYXApKSB7XG4gICAgcmV0dXJuIFtjYXBdO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgbXVzdCBwcm92aWRlIGEgc3RyaW5nIG9yIEpTT04gQXJyYXk7IHJlY2VpdmVkICR7Y2FwfWApO1xufVxuXG5leHBvcnQge1xuICBjb25maWd1cmVBcHAsIGlzUGFja2FnZU9yQnVuZGxlLCBkdXBsaWNhdGVLZXlzLCBwYXJzZUNhcHNBcnJheVxufTtcbiJdLCJmaWxlIjoibGliL2Jhc2Vkcml2ZXIvaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
