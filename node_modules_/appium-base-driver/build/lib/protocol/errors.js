"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProtocolError = void 0;
exports.errorFromMJSONWPStatusCode = errorFromMJSONWPStatusCode;
exports.errorFromW3CJsonCode = errorFromW3CJsonCode;
exports.errors = void 0;
exports.getResponseForJsonwpError = getResponseForJsonwpError;
exports.getResponseForW3CError = getResponseForW3CError;
exports.isErrorType = isErrorType;
exports.isUnknownError = isUnknownError;

require("source-map-support/register");

var _es6Error = _interopRequireDefault(require("es6-error"));

var _lodash = _interopRequireDefault(require("lodash"));

var _appiumSupport = require("appium-support");

var _httpStatusCodes = require("http-status-codes");

const mjsonwpLog = _appiumSupport.logger.getLogger('MJSONWP');

const w3cLog = _appiumSupport.logger.getLogger('W3C');

const W3C_UNKNOWN_ERROR = 'unknown error';

class ProtocolError extends _es6Error.default {
  constructor(msg, jsonwpCode, w3cStatus, error) {
    super(msg);
    this.jsonwpCode = jsonwpCode;
    this.error = error || W3C_UNKNOWN_ERROR;

    if (this.jsonwpCode === null) {
      this.jsonwpCode = 13;
    }

    this.w3cStatus = w3cStatus || _httpStatusCodes.StatusCodes.BAD_REQUEST;
    this._stacktrace = null;
  }

  get stacktrace() {
    return this._stacktrace || this.stack;
  }

  set stacktrace(value) {
    this._stacktrace = value;
  }

}

exports.ProtocolError = ProtocolError;

class NoSuchDriverError extends ProtocolError {
  static code() {
    return 6;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.NOT_FOUND;
  }

  static error() {
    return 'invalid session id';
  }

  constructor(err) {
    super(err || 'A session is either terminated or not started', NoSuchDriverError.code(), NoSuchDriverError.w3cStatus(), NoSuchDriverError.error());
  }

}

class NoSuchElementError extends ProtocolError {
  static code() {
    return 7;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.NOT_FOUND;
  }

  static error() {
    return 'no such element';
  }

  constructor(err) {
    super(err || 'An element could not be located on the page using the given ' + 'search parameters.', NoSuchElementError.code(), NoSuchElementError.w3cStatus(), NoSuchElementError.error());
  }

}

class NoSuchFrameError extends ProtocolError {
  static code() {
    return 8;
  }

  static error() {
    return 'no such frame';
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.NOT_FOUND;
  }

  constructor(err) {
    super(err || 'A request to switch to a frame could not be satisfied because ' + 'the frame could not be found.', NoSuchFrameError.code(), NoSuchFrameError.w3cStatus(), NoSuchFrameError.error());
  }

}

class UnknownCommandError extends ProtocolError {
  static code() {
    return 9;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.NOT_FOUND;
  }

  static error() {
    return 'unknown command';
  }

  constructor(err) {
    super(err || 'The requested resource could not be found, or a request was ' + 'received using an HTTP method that is not supported by the mapped ' + 'resource.', UnknownCommandError.code(), UnknownCommandError.w3cStatus(), UnknownCommandError.error());
  }

}

class StaleElementReferenceError extends ProtocolError {
  static code() {
    return 10;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.NOT_FOUND;
  }

  static error() {
    return 'stale element reference';
  }

  constructor(err) {
    super(err || 'An element command failed because the referenced element is no ' + 'longer attached to the DOM.', StaleElementReferenceError.code(), StaleElementReferenceError.w3cStatus(), StaleElementReferenceError.error());
  }

}

class ElementNotVisibleError extends ProtocolError {
  static code() {
    return 11;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

  static error() {
    return 'element not visible';
  }

  constructor(err) {
    super(err || 'An element command could not be completed because the element is ' + 'not visible on the page.', ElementNotVisibleError.code(), ElementNotVisibleError.w3cStatus(), ElementNotVisibleError.error());
  }

}

class InvalidElementStateError extends ProtocolError {
  static code() {
    return 12;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

  static error() {
    return 'invalid element state';
  }

  constructor(err) {
    super(err || 'An element command could not be completed because the element is ' + 'in an invalid state (e.g. attempting to click a disabled element).', InvalidElementStateError.code(), InvalidElementStateError.w3cStatus(), InvalidElementStateError.error());
  }

}

class UnknownError extends ProtocolError {
  static code() {
    return 13;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return W3C_UNKNOWN_ERROR;
  }

  constructor(errorOrMessage) {
    const origMessage = _lodash.default.isString((errorOrMessage || {}).message) ? errorOrMessage.message : errorOrMessage;
    const message = 'An unknown server-side error occurred while processing the command.' + (origMessage ? ` Original error: ${origMessage}` : '');
    super(message, UnknownError.code(), UnknownError.w3cStatus(), UnknownError.error());
  }

}

class UnknownMethodError extends ProtocolError {
  static code() {
    return 405;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.METHOD_NOT_ALLOWED;
  }

  static error() {
    return 'unknown method';
  }

  constructor(err) {
    super(err || 'The requested command matched a known URL but did not match an method for that URL', UnknownMethodError.code(), UnknownMethodError.w3cStatus(), UnknownMethodError.error());
  }

}

class UnsupportedOperationError extends ProtocolError {
  static code() {
    return 405;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unsupported operation';
  }

  constructor(err) {
    super(err || 'A server-side error occurred. Command cannot be supported.', UnsupportedOperationError.code(), UnsupportedOperationError.w3cStatus(), UnsupportedOperationError.error());
  }

}

class ElementIsNotSelectableError extends ProtocolError {
  static code() {
    return 15;
  }

  static error() {
    return 'element not selectable';
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

  constructor(err) {
    super(err || 'An attempt was made to select an element that cannot be selected.', ElementIsNotSelectableError.code(), ElementIsNotSelectableError.w3cStatus(), ElementIsNotSelectableError.error());
  }

}

class ElementClickInterceptedError extends ProtocolError {
  static code() {
    return 64;
  }

  static error() {
    return 'element click intercepted';
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

  constructor(err) {
    super(err || 'The Element Click command could not be completed because the element receiving ' + 'the events is obscuring the element that was requested clicked', ElementClickInterceptedError.code(), ElementClickInterceptedError.w3cStatus(), ElementClickInterceptedError.error());
  }

}

class ElementNotInteractableError extends ProtocolError {
  static code() {
    return 60;
  }

  static error() {
    return 'element not interactable';
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

  constructor(err) {
    super(err || 'A command could not be completed because the element is not pointer- or keyboard interactable', ElementNotInteractableError.code(), ElementNotInteractableError.w3cStatus(), ElementNotInteractableError.error());
  }

}

class InsecureCertificateError extends ProtocolError {
  static error() {
    return 'insecure certificate';
  }

  constructor(err) {
    super(err || 'Navigation caused the user agent to hit a certificate warning, which is usually the result of an expired or invalid TLS certificate', ElementIsNotSelectableError.code(), null, InsecureCertificateError.error());
  }

}

class JavaScriptError extends ProtocolError {
  static code() {
    return 17;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'javascript error';
  }

  constructor(err) {
    super(err || 'An error occurred while executing user supplied JavaScript.', JavaScriptError.code(), JavaScriptError.w3cStatus(), JavaScriptError.error());
  }

}

class XPathLookupError extends ProtocolError {
  static code() {
    return 19;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

  static error() {
    return 'invalid selector';
  }

  constructor(err) {
    super(err || 'An error occurred while searching for an element by XPath.', XPathLookupError.code(), XPathLookupError.w3cStatus(), XPathLookupError.error());
  }

}

class TimeoutError extends ProtocolError {
  static code() {
    return 21;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.REQUEST_TIMEOUT;
  }

  static error() {
    return 'timeout';
  }

  constructor(err) {
    super(err || 'An operation did not complete before its timeout expired.', TimeoutError.code(), TimeoutError.w3cStatus(), TimeoutError.error());
  }

}

class NoSuchWindowError extends ProtocolError {
  static code() {
    return 23;
  }

  static error() {
    return 'no such window';
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.NOT_FOUND;
  }

  constructor(err) {
    super(err || 'A request to switch to a different window could not be satisfied ' + 'because the window could not be found.', NoSuchWindowError.code(), NoSuchWindowError.w3cStatus(), NoSuchWindowError.error());
  }

}

class InvalidArgumentError extends ProtocolError {
  static code() {
    return 61;
  }

  static error() {
    return 'invalid argument';
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

  constructor(err) {
    super(err || 'The arguments passed to the command are either invalid or malformed', InvalidArgumentError.code(), InvalidArgumentError.w3cStatus(), InvalidArgumentError.error());
  }

}

class InvalidCookieDomainError extends ProtocolError {
  static code() {
    return 24;
  }

  static error() {
    return 'invalid cookie domain';
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

  constructor(err) {
    super(err || 'An illegal attempt was made to set a cookie under a different ' + 'domain than the current page.', InvalidCookieDomainError.code(), InvalidCookieDomainError.w3cStatus(), InvalidCookieDomainError.error());
  }

}

class NoSuchCookieError extends ProtocolError {
  static code() {
    return 62;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.NOT_FOUND;
  }

  static error() {
    return 'no such cookie';
  }

  constructor(err) {
    super(err || 'No cookie matching the given path name was found amongst the associated cookies of the current browsing context’s active document', NoSuchCookieError.code(), NoSuchCookieError.w3cStatus(), NoSuchCookieError.error());
  }

}

class UnableToSetCookieError extends ProtocolError {
  static code() {
    return 25;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unable to set cookie';
  }

  constructor(err) {
    super(err || 'A request to set a cookie\'s value could not be satisfied.', UnableToSetCookieError.code(), UnableToSetCookieError.w3cStatus(), UnableToSetCookieError.error());
  }

}

class UnexpectedAlertOpenError extends ProtocolError {
  static code() {
    return 26;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unexpected alert open';
  }

  constructor(err) {
    super(err || 'A modal dialog was open, blocking this operation', UnexpectedAlertOpenError.code(), UnexpectedAlertOpenError.w3cStatus(), UnexpectedAlertOpenError.error());
  }

}

class NoAlertOpenError extends ProtocolError {
  static code() {
    return 27;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.NOT_FOUND;
  }

  static error() {
    return 'no such alert';
  }

  constructor(err) {
    super(err || 'An attempt was made to operate on a modal dialog when one ' + 'was not open.', NoAlertOpenError.code(), NoAlertOpenError.w3cStatus(), NoAlertOpenError.error());
  }

}

class NoSuchAlertError extends NoAlertOpenError {}

class ScriptTimeoutError extends ProtocolError {
  static code() {
    return 28;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.REQUEST_TIMEOUT;
  }

  static error() {
    return 'script timeout';
  }

  constructor(err) {
    super(err || 'A script did not complete before its timeout expired.', ScriptTimeoutError.code(), ScriptTimeoutError.w3cStatus(), ScriptTimeoutError.error());
  }

}

class InvalidElementCoordinatesError extends ProtocolError {
  static code() {
    return 29;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

  static error() {
    return 'invalid coordinates';
  }

  constructor(err) {
    super(err || 'The coordinates provided to an interactions operation are invalid.', InvalidElementCoordinatesError.code(), InvalidElementCoordinatesError.w3cStatus(), InvalidElementCoordinatesError.error());
  }

}

class InvalidCoordinatesError extends InvalidElementCoordinatesError {}

class IMENotAvailableError extends ProtocolError {
  static code() {
    return 30;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unsupported operation';
  }

  constructor(err) {
    super(err || 'IME was not available.', IMENotAvailableError.code(), IMENotAvailableError.w3cStatus(), IMENotAvailableError.error());
  }

}

class IMEEngineActivationFailedError extends ProtocolError {
  static code() {
    return 31;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unsupported operation';
  }

  constructor(err) {
    super(err || 'An IME engine could not be started.', IMEEngineActivationFailedError.code(), IMEEngineActivationFailedError.w3cStatus(), IMEEngineActivationFailedError.error());
  }

}

class InvalidSelectorError extends ProtocolError {
  static code() {
    return 32;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

  static error() {
    return 'invalid selector';
  }

  constructor(err) {
    super(err || 'Argument was an invalid selector (e.g. XPath/CSS).', InvalidSelectorError.code(), InvalidSelectorError.w3cStatus(), InvalidSelectorError.error());
  }

}

class SessionNotCreatedError extends ProtocolError {
  static code() {
    return 33;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'session not created';
  }

  constructor(details) {
    let message = 'A new session could not be created.';

    if (details) {
      message += ` Details: ${details}`;
    }

    super(message, SessionNotCreatedError.code(), SessionNotCreatedError.w3cStatus(), SessionNotCreatedError.error());
  }

}

class MoveTargetOutOfBoundsError extends ProtocolError {
  static code() {
    return 34;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'move target out of bounds';
  }

  constructor(err) {
    super(err || 'Target provided for a move action is out of bounds.', MoveTargetOutOfBoundsError.code(), MoveTargetOutOfBoundsError.w3cStatus(), MoveTargetOutOfBoundsError.error());
  }

}

class NoSuchContextError extends ProtocolError {
  static code() {
    return 35;
  }

  constructor(err) {
    super(err || 'No such context found.', NoSuchContextError.code());
  }

}

class InvalidContextError extends ProtocolError {
  static code() {
    return 36;
  }

  constructor(err) {
    super(err || 'That command could not be executed in the current context.', InvalidContextError.code());
  }

}

class NotYetImplementedError extends UnknownMethodError {
  constructor(err) {
    super(err || 'Method has not yet been implemented');
  }

}

class NotImplementedError extends UnknownMethodError {
  constructor(err) {
    super(err || 'Method is not implemented');
  }

}

class UnableToCaptureScreen extends ProtocolError {
  static code() {
    return 63;
  }

  static w3cStatus() {
    return _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unable to capture screen';
  }

  constructor(err) {
    super(err || 'A screen capture was made impossible', UnableToCaptureScreen.code(), UnableToCaptureScreen.w3cStatus(), UnableToCaptureScreen.error());
  }

}

class BadParametersError extends _es6Error.default {
  static error() {
    return 'invalid argument';
  }

  constructor(requiredParams, actualParams, errMessage) {
    let message;

    if (!errMessage) {
      message = `Parameters were incorrect. We wanted ` + `${JSON.stringify(requiredParams)} and you ` + `sent ${JSON.stringify(actualParams)}`;
    } else {
      message = `Parameters were incorrect. You sent ${JSON.stringify(actualParams)}, ${errMessage}`;
    }

    super(message);
    this.w3cStatus = _httpStatusCodes.StatusCodes.BAD_REQUEST;
  }

}

class ProxyRequestError extends _es6Error.default {
  constructor(err, responseError, httpStatus) {
    let responseErrorObj = _appiumSupport.util.safeJsonParse(responseError);

    if (!_lodash.default.isPlainObject(responseErrorObj)) {
      responseErrorObj = {};
    }

    let origMessage = _lodash.default.isString(responseError) ? responseError : '';

    if (!_lodash.default.isEmpty(responseErrorObj)) {
      if (_lodash.default.isString(responseErrorObj.value)) {
        origMessage = responseErrorObj.value;
      } else if (_lodash.default.isPlainObject(responseErrorObj.value) && _lodash.default.isString(responseErrorObj.value.message)) {
        origMessage = responseErrorObj.value.message;
      }
    }

    super(_lodash.default.isEmpty(err) ? `Proxy request unsuccessful. ${origMessage}` : err);
    this.w3cStatus = _httpStatusCodes.StatusCodes.BAD_REQUEST;

    if (_lodash.default.isPlainObject(responseErrorObj.value) && _lodash.default.has(responseErrorObj.value, 'error')) {
      this.w3c = responseErrorObj.value;
      this.w3cStatus = httpStatus || _httpStatusCodes.StatusCodes.BAD_REQUEST;
    } else {
      this.jsonwp = responseErrorObj;
    }
  }

  getActualError() {
    if (_appiumSupport.util.hasValue(this.jsonwp) && _appiumSupport.util.hasValue(this.jsonwp.status) && _appiumSupport.util.hasValue(this.jsonwp.value)) {
      return errorFromMJSONWPStatusCode(this.jsonwp.status, this.jsonwp.value);
    } else if (_appiumSupport.util.hasValue(this.w3c) && _lodash.default.isNumber(this.w3cStatus) && this.w3cStatus >= 300) {
      return errorFromW3CJsonCode(this.w3c.error, this.w3c.message || this.message, this.w3c.stacktrace);
    }

    return new UnknownError(this.message);
  }

}

const errors = {
  NotYetImplementedError,
  NotImplementedError,
  BadParametersError,
  InvalidArgumentError,
  NoSuchDriverError,
  NoSuchElementError,
  UnknownCommandError,
  StaleElementReferenceError,
  ElementNotVisibleError,
  InvalidElementStateError,
  UnknownError,
  ElementIsNotSelectableError,
  ElementClickInterceptedError,
  ElementNotInteractableError,
  InsecureCertificateError,
  JavaScriptError,
  XPathLookupError,
  TimeoutError,
  NoSuchWindowError,
  NoSuchCookieError,
  InvalidCookieDomainError,
  InvalidCoordinatesError,
  UnableToSetCookieError,
  UnexpectedAlertOpenError,
  NoAlertOpenError,
  ScriptTimeoutError,
  InvalidElementCoordinatesError,
  IMENotAvailableError,
  IMEEngineActivationFailedError,
  InvalidSelectorError,
  SessionNotCreatedError,
  MoveTargetOutOfBoundsError,
  NoSuchAlertError,
  NoSuchContextError,
  InvalidContextError,
  NoSuchFrameError,
  UnableToCaptureScreen,
  UnknownMethodError,
  UnsupportedOperationError,
  ProxyRequestError
};
exports.errors = errors;
const jsonwpErrorCodeMap = {};

for (let ErrorClass of _lodash.default.values(errors)) {
  if (ErrorClass.code) {
    jsonwpErrorCodeMap[ErrorClass.code()] = ErrorClass;
  }
}

const w3cErrorCodeMap = {};

for (let ErrorClass of _lodash.default.values(errors)) {
  if (ErrorClass.error) {
    w3cErrorCodeMap[ErrorClass.error()] = ErrorClass;
  }
}

function isUnknownError(err) {
  return !err.constructor.name || !_lodash.default.values(errors).find(function equalNames(error) {
    return error.name === err.constructor.name;
  });
}

function isErrorType(err, type) {
  if (type.name === ProtocolError.name) {
    return !!err.jsonwpCode;
  } else if (type.name === ProxyRequestError.name) {
    if (err.jsonwp) {
      return !!err.jsonwp.status;
    }

    if (_lodash.default.isPlainObject(err.w3c)) {
      return _lodash.default.isNumber(err.w3cStatus) && err.w3cStatus >= 300;
    }

    return false;
  }

  return err.constructor.name === type.name;
}

function errorFromMJSONWPStatusCode(code, value = '') {
  const message = (value || {}).message || value || '';

  if (code !== UnknownError.code() && jsonwpErrorCodeMap[code]) {
    mjsonwpLog.debug(`Matched JSONWP error code ${code} to ${jsonwpErrorCodeMap[code].name}`);
    return new jsonwpErrorCodeMap[code](message);
  }

  mjsonwpLog.debug(`Matched JSONWP error code ${code} to UnknownError`);
  return new UnknownError(message);
}

function errorFromW3CJsonCode(code, message, stacktrace = null) {
  if (code && w3cErrorCodeMap[code.toLowerCase()]) {
    w3cLog.debug(`Matched W3C error code '${code}' to ${w3cErrorCodeMap[code.toLowerCase()].name}`);
    const resultError = new w3cErrorCodeMap[code.toLowerCase()](message);
    resultError.stacktrace = stacktrace;
    return resultError;
  }

  w3cLog.debug(`Matched W3C error code '${code}' to UnknownError`);
  const resultError = new UnknownError(message);
  resultError.stacktrace = stacktrace;
  return resultError;
}

function getResponseForW3CError(err) {
  let httpStatus;
  let w3cErrorString;

  if (!err.w3cStatus) {
    err = _appiumSupport.util.hasValue(err.status) ? errorFromMJSONWPStatusCode(err.status, err.value) : new errors.UnknownError(err.message);
  }

  if (isErrorType(err, errors.BadParametersError)) {
    w3cLog.debug(`Bad parameters: ${err}`);
    w3cErrorString = BadParametersError.error();
  } else {
    w3cErrorString = err.error;
  }

  httpStatus = err.w3cStatus;

  if (!w3cErrorString) {
    w3cErrorString = UnknownError.error();
  }

  let httpResBody = {
    value: {
      error: w3cErrorString,
      message: err.message,
      stacktrace: err.stacktrace || err.stack
    }
  };
  return [httpStatus, httpResBody];
}

function getResponseForJsonwpError(err) {
  if (isUnknownError(err)) {
    err = new errors.UnknownError(err);
  }

  let httpStatus = _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  let httpResBody = {
    status: err.jsonwpCode,
    value: {
      message: err.message
    }
  };

  if (isErrorType(err, errors.BadParametersError)) {
    mjsonwpLog.debug(`Bad parameters: ${err}`);
    httpStatus = _httpStatusCodes.StatusCodes.BAD_REQUEST;
    httpResBody = err.message;
  } else if (isErrorType(err, errors.NotYetImplementedError) || isErrorType(err, errors.NotImplementedError)) {
    httpStatus = _httpStatusCodes.StatusCodes.NOT_IMPLEMENTED;
  } else if (isErrorType(err, errors.NoSuchDriverError)) {
    httpStatus = _httpStatusCodes.StatusCodes.NOT_FOUND;
  }

  return [httpStatus, httpResBody];
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wcm90b2NvbC9lcnJvcnMuanMiXSwibmFtZXMiOlsibWpzb253cExvZyIsImxvZ2dlciIsImdldExvZ2dlciIsInczY0xvZyIsIlczQ19VTktOT1dOX0VSUk9SIiwiUHJvdG9jb2xFcnJvciIsIkVTNkVycm9yIiwiY29uc3RydWN0b3IiLCJtc2ciLCJqc29ud3BDb2RlIiwidzNjU3RhdHVzIiwiZXJyb3IiLCJIVFRQU3RhdHVzQ29kZXMiLCJCQURfUkVRVUVTVCIsIl9zdGFja3RyYWNlIiwic3RhY2t0cmFjZSIsInN0YWNrIiwidmFsdWUiLCJOb1N1Y2hEcml2ZXJFcnJvciIsImNvZGUiLCJOT1RfRk9VTkQiLCJlcnIiLCJOb1N1Y2hFbGVtZW50RXJyb3IiLCJOb1N1Y2hGcmFtZUVycm9yIiwiVW5rbm93bkNvbW1hbmRFcnJvciIsIlN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yIiwiRWxlbWVudE5vdFZpc2libGVFcnJvciIsIkludmFsaWRFbGVtZW50U3RhdGVFcnJvciIsIlVua25vd25FcnJvciIsIklOVEVSTkFMX1NFUlZFUl9FUlJPUiIsImVycm9yT3JNZXNzYWdlIiwib3JpZ01lc3NhZ2UiLCJfIiwiaXNTdHJpbmciLCJtZXNzYWdlIiwiVW5rbm93bk1ldGhvZEVycm9yIiwiTUVUSE9EX05PVF9BTExPV0VEIiwiVW5zdXBwb3J0ZWRPcGVyYXRpb25FcnJvciIsIkVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvciIsIkVsZW1lbnRDbGlja0ludGVyY2VwdGVkRXJyb3IiLCJFbGVtZW50Tm90SW50ZXJhY3RhYmxlRXJyb3IiLCJJbnNlY3VyZUNlcnRpZmljYXRlRXJyb3IiLCJKYXZhU2NyaXB0RXJyb3IiLCJYUGF0aExvb2t1cEVycm9yIiwiVGltZW91dEVycm9yIiwiUkVRVUVTVF9USU1FT1VUIiwiTm9TdWNoV2luZG93RXJyb3IiLCJJbnZhbGlkQXJndW1lbnRFcnJvciIsIkludmFsaWRDb29raWVEb21haW5FcnJvciIsIk5vU3VjaENvb2tpZUVycm9yIiwiVW5hYmxlVG9TZXRDb29raWVFcnJvciIsIlVuZXhwZWN0ZWRBbGVydE9wZW5FcnJvciIsIk5vQWxlcnRPcGVuRXJyb3IiLCJOb1N1Y2hBbGVydEVycm9yIiwiU2NyaXB0VGltZW91dEVycm9yIiwiSW52YWxpZEVsZW1lbnRDb29yZGluYXRlc0Vycm9yIiwiSW52YWxpZENvb3JkaW5hdGVzRXJyb3IiLCJJTUVOb3RBdmFpbGFibGVFcnJvciIsIklNRUVuZ2luZUFjdGl2YXRpb25GYWlsZWRFcnJvciIsIkludmFsaWRTZWxlY3RvckVycm9yIiwiU2Vzc2lvbk5vdENyZWF0ZWRFcnJvciIsImRldGFpbHMiLCJNb3ZlVGFyZ2V0T3V0T2ZCb3VuZHNFcnJvciIsIk5vU3VjaENvbnRleHRFcnJvciIsIkludmFsaWRDb250ZXh0RXJyb3IiLCJOb3RZZXRJbXBsZW1lbnRlZEVycm9yIiwiTm90SW1wbGVtZW50ZWRFcnJvciIsIlVuYWJsZVRvQ2FwdHVyZVNjcmVlbiIsIkJhZFBhcmFtZXRlcnNFcnJvciIsInJlcXVpcmVkUGFyYW1zIiwiYWN0dWFsUGFyYW1zIiwiZXJyTWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJQcm94eVJlcXVlc3RFcnJvciIsInJlc3BvbnNlRXJyb3IiLCJodHRwU3RhdHVzIiwicmVzcG9uc2VFcnJvck9iaiIsInV0aWwiLCJzYWZlSnNvblBhcnNlIiwiaXNQbGFpbk9iamVjdCIsImlzRW1wdHkiLCJoYXMiLCJ3M2MiLCJqc29ud3AiLCJnZXRBY3R1YWxFcnJvciIsImhhc1ZhbHVlIiwic3RhdHVzIiwiZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUiLCJpc051bWJlciIsImVycm9yRnJvbVczQ0pzb25Db2RlIiwiZXJyb3JzIiwianNvbndwRXJyb3JDb2RlTWFwIiwiRXJyb3JDbGFzcyIsInZhbHVlcyIsInczY0Vycm9yQ29kZU1hcCIsImlzVW5rbm93bkVycm9yIiwibmFtZSIsImZpbmQiLCJlcXVhbE5hbWVzIiwiaXNFcnJvclR5cGUiLCJ0eXBlIiwiZGVidWciLCJ0b0xvd2VyQ2FzZSIsInJlc3VsdEVycm9yIiwiZ2V0UmVzcG9uc2VGb3JXM0NFcnJvciIsInczY0Vycm9yU3RyaW5nIiwiaHR0cFJlc0JvZHkiLCJnZXRSZXNwb25zZUZvckpzb253cEVycm9yIiwiTk9UX0lNUExFTUVOVEVEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxNQUFNQSxVQUFVLEdBQUdDLHNCQUFPQyxTQUFQLENBQWlCLFNBQWpCLENBQW5COztBQUNBLE1BQU1DLE1BQU0sR0FBR0Ysc0JBQU9DLFNBQVAsQ0FBaUIsS0FBakIsQ0FBZjs7QUFFQSxNQUFNRSxpQkFBaUIsR0FBRyxlQUExQjs7QUFHQSxNQUFNQyxhQUFOLFNBQTRCQyxpQkFBNUIsQ0FBcUM7QUFDbkNDLEVBQUFBLFdBQVcsQ0FBRUMsR0FBRixFQUFPQyxVQUFQLEVBQW1CQyxTQUFuQixFQUE4QkMsS0FBOUIsRUFBcUM7QUFDOUMsVUFBTUgsR0FBTjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0UsS0FBTCxHQUFhQSxLQUFLLElBQUlQLGlCQUF0Qjs7QUFDQSxRQUFJLEtBQUtLLFVBQUwsS0FBb0IsSUFBeEIsRUFBOEI7QUFDNUIsV0FBS0EsVUFBTCxHQUFrQixFQUFsQjtBQUNEOztBQUNELFNBQUtDLFNBQUwsR0FBaUJBLFNBQVMsSUFBSUUsNkJBQWdCQyxXQUE5QztBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDRDs7QUFFYSxNQUFWQyxVQUFVLEdBQUk7QUFDaEIsV0FBTyxLQUFLRCxXQUFMLElBQW9CLEtBQUtFLEtBQWhDO0FBQ0Q7O0FBRWEsTUFBVkQsVUFBVSxDQUFFRSxLQUFGLEVBQVM7QUFDckIsU0FBS0gsV0FBTCxHQUFtQkcsS0FBbkI7QUFDRDs7QUFsQmtDOzs7O0FBeUJyQyxNQUFNQyxpQkFBTixTQUFnQ2IsYUFBaEMsQ0FBOEM7QUFDakMsU0FBSmMsSUFBSSxHQUFJO0FBQ2IsV0FBTyxDQUFQO0FBQ0Q7O0FB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LFVBQVUsR0FBR2hFLDZCQUFnQmlHLGVBQTdCO0FBQ0QsR0FKTSxNQUlBLElBQUlULFdBQVcsQ0FBQy9FLEdBQUQsRUFBTXNFLE1BQU0sQ0FBQ3pFLGlCQUFiLENBQWYsRUFBZ0Q7QUFFckQwRCxJQUFBQSxVQUFVLEdBQUdoRSw2QkFBZ0JRLFNBQTdCO0FBQ0Q7O0FBR0QsU0FBTyxDQUFDd0QsVUFBRCxFQUFhK0IsV0FBYixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRVM2RXJyb3IgZnJvbSAnZXM2LWVycm9yJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1dGlsLCBsb2dnZXIgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyBTdGF0dXNDb2RlcyBhcyBIVFRQU3RhdHVzQ29kZXMgfSBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XG5cbmNvbnN0IG1qc29ud3BMb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKCdNSlNPTldQJyk7XG5jb25zdCB3M2NMb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKCdXM0MnKTtcblxuY29uc3QgVzNDX1VOS05PV05fRVJST1IgPSAndW5rbm93biBlcnJvcic7XG5cbi8vIGJhc2UgZXJyb3IgY2xhc3MgZm9yIGFsbCBvZiBvdXIgZXJyb3JzXG5jbGFzcyBQcm90b2NvbEVycm9yIGV4dGVuZHMgRVM2RXJyb3Ige1xuICBjb25zdHJ1Y3RvciAobXNnLCBqc29ud3BDb2RlLCB3M2NTdGF0dXMsIGVycm9yKSB7XG4gICAgc3VwZXIobXNnKTtcbiAgICB0aGlzLmpzb253cENvZGUgPSBqc29ud3BDb2RlO1xuICAgIHRoaXMuZXJyb3IgPSBlcnJvciB8fCBXM0NfVU5LTk9XTl9FUlJPUjtcbiAgICBpZiAodGhpcy5qc29ud3BDb2RlID09PSBudWxsKSB7XG4gICAgICB0aGlzLmpzb253cENvZGUgPSAxMztcbiAgICB9XG4gICAgdGhpcy53M2NTdGF0dXMgPSB3M2NTdGF0dXMgfHwgSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICAgIHRoaXMuX3N0YWNrdHJhY2UgPSBudWxsO1xuICB9XG5cbiAgZ2V0IHN0YWNrdHJhY2UgKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGFja3RyYWNlIHx8IHRoaXMuc3RhY2s7XG4gIH1cblxuICBzZXQgc3RhY2t0cmFjZSAodmFsdWUpIHtcbiAgICB0aGlzLl9zdGFja3RyYWNlID0gdmFsdWU7XG4gIH1cbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL1NlbGVuaXVtSFEvc2VsZW5pdW0vYmxvYi8xNzZiNGE5ZTMwODJhYzE5MjZmMmE0MzZlYjM0Njc2MGMzN2E1OTk4L2phdmEvY2xpZW50L3NyYy9vcmcvb3BlbnFhL3NlbGVuaXVtL3JlbW90ZS9FcnJvckNvZGVzLmphdmEjTDIxNVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL1NlbGVuaXVtSFEvc2VsZW5pdW0vaXNzdWVzLzU1NjIjaXNzdWVjb21tZW50LTM3MDM3OTQ3MFxuLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmRyaXZlci93ZWJkcml2ZXItc3BlYy5odG1sI2Rmbi1lcnJvci1jb2RlXG5cbmNsYXNzIE5vU3VjaERyaXZlckVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNjtcbiAgfVxuICAvLyBXM0MgRXJyb3IgaXMgY2FsbGVkIEludmFsaWRTZXNzaW9uSURcbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2ludmFsaWQgc2Vzc2lvbiBpZCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSBzZXNzaW9uIGlzIGVpdGhlciB0ZXJtaW5hdGVkIG9yIG5vdCBzdGFydGVkJywgTm9TdWNoRHJpdmVyRXJyb3IuY29kZSgpLFxuICAgICAgICAgIE5vU3VjaERyaXZlckVycm9yLnczY1N0YXR1cygpLCBOb1N1Y2hEcml2ZXJFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBOb1N1Y2hFbGVtZW50RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiA3O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuTk9UX0ZPVU5EO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdubyBzdWNoIGVsZW1lbnQnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGVsZW1lbnQgY291bGQgbm90IGJlIGxvY2F0ZWQgb24gdGhlIHBhZ2UgdXNpbmcgdGhlIGdpdmVuICcgK1xuICAgICAgICAgICdzZWFyY2ggcGFyYW1ldGVycy4nLCBOb1N1Y2hFbGVtZW50RXJyb3IuY29kZSgpLCBOb1N1Y2hFbGVtZW50RXJyb3IudzNjU3RhdHVzKCksXG4gICAgICAgICAgTm9TdWNoRWxlbWVudEVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaEZyYW1lRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiA4O1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdubyBzdWNoIGZyYW1lJztcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLk5PVF9GT1VORDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIHJlcXVlc3QgdG8gc3dpdGNoIHRvIGEgZnJhbWUgY291bGQgbm90IGJlIHNhdGlzZmllZCBiZWNhdXNlICcgK1xuICAgICAgICAgICd0aGUgZnJhbWUgY291bGQgbm90IGJlIGZvdW5kLicsIE5vU3VjaEZyYW1lRXJyb3IuY29kZSgpLFxuICAgICAgICAgIE5vU3VjaEZyYW1lRXJyb3IudzNjU3RhdHVzKCksIE5vU3VjaEZyYW1lRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgVW5rbm93bkNvbW1hbmRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDk7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ3Vua25vd24gY29tbWFuZCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnVGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjb3VsZCBub3QgYmUgZm91bmQsIG9yIGEgcmVxdWVzdCB3YXMgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkIHVzaW5nIGFuIEhUVFAgbWV0aG9kIHRoYXQgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgbWFwcGVkICcgK1xuICAgICAgICAgICdyZXNvdXJjZS4nLCBVbmtub3duQ29tbWFuZEVycm9yLmNvZGUoKSwgVW5rbm93bkNvbW1hbmRFcnJvci53M2NTdGF0dXMoKSwgVW5rbm93bkNvbW1hbmRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBTdGFsZUVsZW1lbnRSZWZlcmVuY2VFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDEwO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuTk9UX0ZPVU5EO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdzdGFsZSBlbGVtZW50IHJlZmVyZW5jZSc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gZWxlbWVudCBjb21tYW5kIGZhaWxlZCBiZWNhdXNlIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQgaXMgbm8gJyArXG4gICAgICAgICAgJ2xvbmdlciBhdHRhY2hlZCB0byB0aGUgRE9NLicsIFN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yLmNvZGUoKSxcbiAgICAgICAgICBTdGFsZUVsZW1lbnRSZWZlcmVuY2VFcnJvci53M2NTdGF0dXMoKSwgU3RhbGVFbGVtZW50UmVmZXJlbmNlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudE5vdFZpc2libGVFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDExO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2VsZW1lbnQgbm90IHZpc2libGUnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGVsZW1lbnQgY29tbWFuZCBjb3VsZCBub3QgYmUgY29tcGxldGVkIGJlY2F1c2UgdGhlIGVsZW1lbnQgaXMgJyArXG4gICAgICAgICAgJ25vdCB2aXNpYmxlIG9uIHRoZSBwYWdlLicsIEVsZW1lbnROb3RWaXNpYmxlRXJyb3IuY29kZSgpLFxuICAgICAgICAgIEVsZW1lbnROb3RWaXNpYmxlRXJyb3IudzNjU3RhdHVzKCksIEVsZW1lbnROb3RWaXNpYmxlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZEVsZW1lbnRTdGF0ZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTI7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVDtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnaW52YWxpZCBlbGVtZW50IHN0YXRlJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlbGVtZW50IGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSBlbGVtZW50IGlzICcgK1xuICAgICAgICAgICdpbiBhbiBpbnZhbGlkIHN0YXRlIChlLmcuIGF0dGVtcHRpbmcgdG8gY2xpY2sgYSBkaXNhYmxlZCBlbGVtZW50KS4nLFxuICAgICAgICAgIEludmFsaWRFbGVtZW50U3RhdGVFcnJvci5jb2RlKCksIEludmFsaWRFbGVtZW50U3RhdGVFcnJvci53M2NTdGF0dXMoKSxcbiAgICAgICAgICBJbnZhbGlkRWxlbWVudFN0YXRlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgVW5rbm93bkVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTM7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5JTlRFUk5BTF9TRVJWRVJfRVJST1I7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gVzNDX1VOS05PV05fRVJST1I7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycm9yT3JNZXNzYWdlKSB7XG4gICAgY29uc3Qgb3JpZ01lc3NhZ2UgPSBfLmlzU3RyaW5nKChlcnJvck9yTWVzc2FnZSB8fCB7fSkubWVzc2FnZSlcbiAgICAgID8gZXJyb3JPck1lc3NhZ2UubWVzc2FnZVxuICAgICAgOiBlcnJvck9yTWVzc2FnZTtcbiAgICBjb25zdCBtZXNzYWdlID0gJ0FuIHVua25vd24gc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY29tbWFuZC4nICtcbiAgICAgIChvcmlnTWVzc2FnZSA/IGAgT3JpZ2luYWwgZXJyb3I6ICR7b3JpZ01lc3NhZ2V9YCA6ICcnKTtcbiAgICBzdXBlcihtZXNzYWdlLCBVbmtub3duRXJyb3IuY29kZSgpLCBVbmtub3duRXJyb3IudzNjU3RhdHVzKCksIFVua25vd25FcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBVbmtub3duTWV0aG9kRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiA0MDU7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5NRVRIT0RfTk9UX0FMTE9XRUQ7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ3Vua25vd24gbWV0aG9kJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgcmVxdWVzdGVkIGNvbW1hbmQgbWF0Y2hlZCBhIGtub3duIFVSTCBidXQgZGlkIG5vdCBtYXRjaCBhbiBtZXRob2QgZm9yIHRoYXQgVVJMJyxcbiAgICAgICAgICBVbmtub3duTWV0aG9kRXJyb3IuY29kZSgpLCBVbmtub3duTWV0aG9kRXJyb3IudzNjU3RhdHVzKCksIFVua25vd25NZXRob2RFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBVbnN1cHBvcnRlZE9wZXJhdGlvbkVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNDA1O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bnN1cHBvcnRlZCBvcGVyYXRpb24nO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0Egc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQuIENvbW1hbmQgY2Fubm90IGJlIHN1cHBvcnRlZC4nLFxuICAgICAgICAgIFVuc3VwcG9ydGVkT3BlcmF0aW9uRXJyb3IuY29kZSgpLCBVbnN1cHBvcnRlZE9wZXJhdGlvbkVycm9yLnczY1N0YXR1cygpLFxuICAgICAgICAgIFVuc3VwcG9ydGVkT3BlcmF0aW9uRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudElzTm90U2VsZWN0YWJsZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTU7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2VsZW1lbnQgbm90IHNlbGVjdGFibGUnO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gYXR0ZW1wdCB3YXMgbWFkZSB0byBzZWxlY3QgYW4gZWxlbWVudCB0aGF0IGNhbm5vdCBiZSBzZWxlY3RlZC4nLFxuICAgICAgICAgIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvci5jb2RlKCksIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvci53M2NTdGF0dXMoKSxcbiAgICAgICAgICBFbGVtZW50SXNOb3RTZWxlY3RhYmxlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudENsaWNrSW50ZXJjZXB0ZWRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDY0O1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdlbGVtZW50IGNsaWNrIGludGVyY2VwdGVkJztcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ1RoZSBFbGVtZW50IENsaWNrIGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSBlbGVtZW50IHJlY2VpdmluZyAnICtcbiAgICAgICAgICAndGhlIGV2ZW50cyBpcyBvYnNjdXJpbmcgdGhlIGVsZW1lbnQgdGhhdCB3YXMgcmVxdWVzdGVkIGNsaWNrZWQnLFxuICAgICAgICAgIEVsZW1lbnRDbGlja0ludGVyY2VwdGVkRXJyb3IuY29kZSgpLCBFbGVtZW50Q2xpY2tJbnRlcmNlcHRlZEVycm9yLnczY1N0YXR1cygpLFxuICAgICAgICAgIEVsZW1lbnRDbGlja0ludGVyY2VwdGVkRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudE5vdEludGVyYWN0YWJsZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNjA7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2VsZW1lbnQgbm90IGludGVyYWN0YWJsZSc7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSBlbGVtZW50IGlzIG5vdCBwb2ludGVyLSBvciBrZXlib2FyZCBpbnRlcmFjdGFibGUnLFxuICAgICAgICAgIEVsZW1lbnROb3RJbnRlcmFjdGFibGVFcnJvci5jb2RlKCksIEVsZW1lbnROb3RJbnRlcmFjdGFibGVFcnJvci53M2NTdGF0dXMoKSxcbiAgICAgICAgICBFbGVtZW50Tm90SW50ZXJhY3RhYmxlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW5zZWN1cmVDZXJ0aWZpY2F0ZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnNlY3VyZSBjZXJ0aWZpY2F0ZSc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnTmF2aWdhdGlvbiBjYXVzZWQgdGhlIHVzZXIgYWdlbnQgdG8gaGl0IGEgY2VydGlmaWNhdGUgd2FybmluZywgd2hpY2ggaXMgdXN1YWxseSB0aGUgcmVzdWx0IG9mIGFuIGV4cGlyZWQgb3IgaW52YWxpZCBUTFMgY2VydGlmaWNhdGUnLFxuICAgICAgRWxlbWVudElzTm90U2VsZWN0YWJsZUVycm9yLmNvZGUoKSwgbnVsbCwgSW5zZWN1cmVDZXJ0aWZpY2F0ZUVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIEphdmFTY3JpcHRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDE3O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdqYXZhc2NyaXB0IGVycm9yJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBleGVjdXRpbmcgdXNlciBzdXBwbGllZCBKYXZhU2NyaXB0LicsXG4gICAgICAgICAgSmF2YVNjcmlwdEVycm9yLmNvZGUoKSwgSmF2YVNjcmlwdEVycm9yLnczY1N0YXR1cygpLCBKYXZhU2NyaXB0RXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgWFBhdGhMb29rdXBFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDE5O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2ludmFsaWQgc2VsZWN0b3InO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNlYXJjaGluZyBmb3IgYW4gZWxlbWVudCBieSBYUGF0aC4nLFxuICAgICAgICAgIFhQYXRoTG9va3VwRXJyb3IuY29kZSgpLCBYUGF0aExvb2t1cEVycm9yLnczY1N0YXR1cygpLCBYUGF0aExvb2t1cEVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIFRpbWVvdXRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDIxO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuUkVRVUVTVF9USU1FT1VUO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd0aW1lb3V0JztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBvcGVyYXRpb24gZGlkIG5vdCBjb21wbGV0ZSBiZWZvcmUgaXRzIHRpbWVvdXQgZXhwaXJlZC4nLFxuICAgICAgICAgIFRpbWVvdXRFcnJvci5jb2RlKCksIFRpbWVvdXRFcnJvci53M2NTdGF0dXMoKSwgVGltZW91dEVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaFdpbmRvd0Vycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMjM7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ25vIHN1Y2ggd2luZG93JztcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLk5PVF9GT1VORDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIHJlcXVlc3QgdG8gc3dpdGNoIHRvIGEgZGlmZmVyZW50IHdpbmRvdyBjb3VsZCBub3QgYmUgc2F0aXNmaWVkICcgK1xuICAgICAgICAgICdiZWNhdXNlIHRoZSB3aW5kb3cgY291bGQgbm90IGJlIGZvdW5kLicsIE5vU3VjaFdpbmRvd0Vycm9yLmNvZGUoKSxcbiAgICAgICAgICBOb1N1Y2hXaW5kb3dFcnJvci53M2NTdGF0dXMoKSwgTm9TdWNoV2luZG93RXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiA2MTtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnaW52YWxpZCBhcmd1bWVudCc7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgY29tbWFuZCBhcmUgZWl0aGVyIGludmFsaWQgb3IgbWFsZm9ybWVkJyxcbiAgICAgICAgICBJbnZhbGlkQXJndW1lbnRFcnJvci5jb2RlKCksIEludmFsaWRBcmd1bWVudEVycm9yLnczY1N0YXR1cygpLFxuICAgICAgICAgIEludmFsaWRBcmd1bWVudEVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRDb29raWVEb21haW5FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI0O1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnZhbGlkIGNvb2tpZSBkb21haW4nO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gaWxsZWdhbCBhdHRlbXB0IHdhcyBtYWRlIHRvIHNldCBhIGNvb2tpZSB1bmRlciBhIGRpZmZlcmVudCAnICtcbiAgICAgICAgICAnZG9tYWluIHRoYW4gdGhlIGN1cnJlbnQgcGFnZS4nLCBJbnZhbGlkQ29va2llRG9tYWluRXJyb3IuY29kZSgpLFxuICAgICAgICAgIEludmFsaWRDb29raWVEb21haW5FcnJvci53M2NTdGF0dXMoKSwgSW52YWxpZENvb2tpZURvbWFpbkVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaENvb2tpZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNjI7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ25vIHN1Y2ggY29va2llJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdObyBjb29raWUgbWF0Y2hpbmcgdGhlIGdpdmVuIHBhdGggbmFtZSB3YXMgZm91bmQgYW1vbmdzdCB0aGUgYXNzb2NpYXRlZCBjb29raWVzIG9mIHRoZSBjdXJyZW50IGJyb3dzaW5nIGNvbnRleHTigJlzIGFjdGl2ZSBkb2N1bWVudCcsXG4gICAgICAgICAgTm9TdWNoQ29va2llRXJyb3IuY29kZSgpLCBOb1N1Y2hDb29raWVFcnJvci53M2NTdGF0dXMoKSwgTm9TdWNoQ29va2llRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgVW5hYmxlVG9TZXRDb29raWVFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI1O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bmFibGUgdG8gc2V0IGNvb2tpZSc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSByZXF1ZXN0IHRvIHNldCBhIGNvb2tpZVxcJ3MgdmFsdWUgY291bGQgbm90IGJlIHNhdGlzZmllZC4nLFxuICAgICAgICAgIFVuYWJsZVRvU2V0Q29va2llRXJyb3IuY29kZSgpLCBVbmFibGVUb1NldENvb2tpZUVycm9yLnczY1N0YXR1cygpLCBVbmFibGVUb1NldENvb2tpZUVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIFVuZXhwZWN0ZWRBbGVydE9wZW5FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI2O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bmV4cGVjdGVkIGFsZXJ0IG9wZW4nO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0EgbW9kYWwgZGlhbG9nIHdhcyBvcGVuLCBibG9ja2luZyB0aGlzIG9wZXJhdGlvbicsXG4gICAgICAgICAgVW5leHBlY3RlZEFsZXJ0T3BlbkVycm9yLmNvZGUoKSwgVW5leHBlY3RlZEFsZXJ0T3BlbkVycm9yLnczY1N0YXR1cygpLCBVbmV4cGVjdGVkQWxlcnRPcGVuRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgTm9BbGVydE9wZW5FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI3O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuTk9UX0ZPVU5EO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdubyBzdWNoIGFsZXJ0JztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBhdHRlbXB0IHdhcyBtYWRlIHRvIG9wZXJhdGUgb24gYSBtb2RhbCBkaWFsb2cgd2hlbiBvbmUgJyArXG4gICAgICAgICAgJ3dhcyBub3Qgb3Blbi4nLCBOb0FsZXJ0T3BlbkVycm9yLmNvZGUoKSwgTm9BbGVydE9wZW5FcnJvci53M2NTdGF0dXMoKSwgTm9BbGVydE9wZW5FcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBOb1N1Y2hBbGVydEVycm9yIGV4dGVuZHMgTm9BbGVydE9wZW5FcnJvciB7fVxuXG5jbGFzcyBTY3JpcHRUaW1lb3V0RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyODtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLlJFUVVFU1RfVElNRU9VVDtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnc2NyaXB0IHRpbWVvdXQnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0Egc2NyaXB0IGRpZCBub3QgY29tcGxldGUgYmVmb3JlIGl0cyB0aW1lb3V0IGV4cGlyZWQuJyxcbiAgICAgICAgICBTY3JpcHRUaW1lb3V0RXJyb3IuY29kZSgpLCBTY3JpcHRUaW1lb3V0RXJyb3IudzNjU3RhdHVzKCksIFNjcmlwdFRpbWVvdXRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyOTtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnZhbGlkIGNvb3JkaW5hdGVzJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgY29vcmRpbmF0ZXMgcHJvdmlkZWQgdG8gYW4gaW50ZXJhY3Rpb25zIG9wZXJhdGlvbiBhcmUgaW52YWxpZC4nLFxuICAgICAgICAgIEludmFsaWRFbGVtZW50Q29vcmRpbmF0ZXNFcnJvci5jb2RlKCksIEludmFsaWRFbGVtZW50Q29vcmRpbmF0ZXNFcnJvci53M2NTdGF0dXMoKSxcbiAgICAgICAgICBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZENvb3JkaW5hdGVzRXJyb3IgZXh0ZW5kcyBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3Ige31cblxuY2xhc3MgSU1FTm90QXZhaWxhYmxlRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzMDtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAndW5zdXBwb3J0ZWQgb3BlcmF0aW9uJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdJTUUgd2FzIG5vdCBhdmFpbGFibGUuJywgSU1FTm90QXZhaWxhYmxlRXJyb3IuY29kZSgpLFxuICAgICAgICAgIElNRU5vdEF2YWlsYWJsZUVycm9yLnczY1N0YXR1cygpLCBJTUVOb3RBdmFpbGFibGVFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBJTUVFbmdpbmVBY3RpdmF0aW9uRmFpbGVkRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzMTtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAndW5zdXBwb3J0ZWQgb3BlcmF0aW9uJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBJTUUgZW5naW5lIGNvdWxkIG5vdCBiZSBzdGFydGVkLicsXG4gICAgICAgICAgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yLmNvZGUoKSwgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yLnczY1N0YXR1cygpLFxuICAgICAgICAgIElNRUVuZ2luZUFjdGl2YXRpb25GYWlsZWRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkU2VsZWN0b3JFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDMyO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2ludmFsaWQgc2VsZWN0b3InO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FyZ3VtZW50IHdhcyBhbiBpbnZhbGlkIHNlbGVjdG9yIChlLmcuIFhQYXRoL0NTUykuJyxcbiAgICAgICAgICBJbnZhbGlkU2VsZWN0b3JFcnJvci5jb2RlKCksIEludmFsaWRTZWxlY3RvckVycm9yLnczY1N0YXR1cygpLFxuICAgICAgICAgIEludmFsaWRTZWxlY3RvckVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIFNlc3Npb25Ob3RDcmVhdGVkRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzMztcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnc2Vzc2lvbiBub3QgY3JlYXRlZCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGRldGFpbHMpIHtcbiAgICBsZXQgbWVzc2FnZSA9ICdBIG5ldyBzZXNzaW9uIGNvdWxkIG5vdCBiZSBjcmVhdGVkLic7XG4gICAgaWYgKGRldGFpbHMpIHtcbiAgICAgIG1lc3NhZ2UgKz0gYCBEZXRhaWxzOiAke2RldGFpbHN9YDtcbiAgICB9XG5cbiAgICBzdXBlcihtZXNzYWdlLCBTZXNzaW9uTm90Q3JlYXRlZEVycm9yLmNvZGUoKSwgU2Vzc2lvbk5vdENyZWF0ZWRFcnJvci53M2NTdGF0dXMoKSwgU2Vzc2lvbk5vdENyZWF0ZWRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBNb3ZlVGFyZ2V0T3V0T2ZCb3VuZHNFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDM0O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdtb3ZlIHRhcmdldCBvdXQgb2YgYm91bmRzJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUYXJnZXQgcHJvdmlkZWQgZm9yIGEgbW92ZSBhY3Rpb24gaXMgb3V0IG9mIGJvdW5kcy4nLFxuICAgICAgICAgIE1vdmVUYXJnZXRPdXRPZkJvdW5kc0Vycm9yLmNvZGUoKSwgTW92ZVRhcmdldE91dE9mQm91bmRzRXJyb3IudzNjU3RhdHVzKCksIE1vdmVUYXJnZXRPdXRPZkJvdW5kc0Vycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaENvbnRleHRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDM1O1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ05vIHN1Y2ggY29udGV4dCBmb3VuZC4nLCBOb1N1Y2hDb250ZXh0RXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkQ29udGV4dEVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMzY7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnVGhhdCBjb21tYW5kIGNvdWxkIG5vdCBiZSBleGVjdXRlZCBpbiB0aGUgY3VycmVudCBjb250ZXh0LicsXG4gICAgICAgICAgSW52YWxpZENvbnRleHRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbi8vIFRoZXNlIGFyZSBhbGlhc2VzIGZvciBVbmtub3duTWV0aG9kRXJyb3JcbmNsYXNzIE5vdFlldEltcGxlbWVudGVkRXJyb3IgZXh0ZW5kcyBVbmtub3duTWV0aG9kRXJyb3Ige1xuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdNZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBpbXBsZW1lbnRlZCcpO1xuICB9XG59XG5jbGFzcyBOb3RJbXBsZW1lbnRlZEVycm9yIGV4dGVuZHMgVW5rbm93bk1ldGhvZEVycm9yIHtcbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnTWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG59XG5cbmNsYXNzIFVuYWJsZVRvQ2FwdHVyZVNjcmVlbiBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDYzO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bmFibGUgdG8gY2FwdHVyZSBzY3JlZW4nO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0Egc2NyZWVuIGNhcHR1cmUgd2FzIG1hZGUgaW1wb3NzaWJsZScsXG4gICAgICAgICAgVW5hYmxlVG9DYXB0dXJlU2NyZWVuLmNvZGUoKSwgVW5hYmxlVG9DYXB0dXJlU2NyZWVuLnczY1N0YXR1cygpLCBVbmFibGVUb0NhcHR1cmVTY3JlZW4uZXJyb3IoKSk7XG4gIH1cbn1cblxuXG4vLyBFcXVpdmFsZW50IHRvIFczQyBJbnZhbGlkQXJndW1lbnRFcnJvclxuY2xhc3MgQmFkUGFyYW1ldGVyc0Vycm9yIGV4dGVuZHMgRVM2RXJyb3Ige1xuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnaW52YWxpZCBhcmd1bWVudCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKHJlcXVpcmVkUGFyYW1zLCBhY3R1YWxQYXJhbXMsIGVyck1lc3NhZ2UpIHtcbiAgICBsZXQgbWVzc2FnZTtcbiAgICBpZiAoIWVyck1lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSBgUGFyYW1ldGVycyB3ZXJlIGluY29ycmVjdC4gV2Ugd2FudGVkIGAgK1xuICAgICAgICAgIGAke0pTT04uc3RyaW5naWZ5KHJlcXVpcmVkUGFyYW1zKX0gYW5kIHlvdSBgICtcbiAgICAgICAgICBgc2VudCAke0pTT04uc3RyaW5naWZ5KGFjdHVhbFBhcmFtcyl9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSA9IGBQYXJhbWV0ZXJzIHdlcmUgaW5jb3JyZWN0LiBZb3Ugc2VudCAke0pTT04uc3RyaW5naWZ5KGFjdHVhbFBhcmFtcyl9LCAke2Vyck1lc3NhZ2V9YDtcbiAgICB9XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy53M2NTdGF0dXMgPSBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbn1cblxuLyoqXG4gKiBQcm94eVJlcXVlc3RFcnJvciBpcyBhIGN1c3RvbSBlcnJvciBhbmQgd2lsbCBiZSB0aHJvd24gdXAgb24gdW5zdWNjZXNzZnVsIHByb3h5IHJlcXVlc3QgYW5kXG4gKiB3aWxsIGNvbnRhaW4gaW5mb3JtYXRpb24gYWJvdXQgdGhlIHByb3h5IGZhaWx1cmUuXG4gKiBJbiBjYXNlIG9mIFByb3h5UmVxdWVzdEVycm9yIHNob3VsZCBmZXRjaCB0aGUgYWN0dWFsIGVycm9yIGJ5IGNhbGxpbmcgYGdldEFjdHVhbEVycm9yKClgXG4gKiBmb3IgcHJveHkgZmFpbHVyZSB0byBnZW5lcmF0ZSB0aGUgY2xpZW50IHJlc3BvbnNlLlxuICovXG5jbGFzcyBQcm94eVJlcXVlc3RFcnJvciBleHRlbmRzIEVTNkVycm9yIHtcbiAgY29uc3RydWN0b3IgKGVyciwgcmVzcG9uc2VFcnJvciwgaHR0cFN0YXR1cykge1xuICAgIGxldCByZXNwb25zZUVycm9yT2JqID0gdXRpbC5zYWZlSnNvblBhcnNlKHJlc3BvbnNlRXJyb3IpO1xuICAgIGlmICghXy5pc1BsYWluT2JqZWN0KHJlc3BvbnNlRXJyb3JPYmopKSB7XG4gICAgICByZXNwb25zZUVycm9yT2JqID0ge307XG4gICAgfVxuICAgIGxldCBvcmlnTWVzc2FnZSA9IF8uaXNTdHJpbmcocmVzcG9uc2VFcnJvcikgPyByZXNwb25zZUVycm9yIDogJyc7XG4gICAgaWYgKCFfLmlzRW1wdHkocmVzcG9uc2VFcnJvck9iaikpIHtcbiAgICAgIGlmIChfLmlzU3RyaW5nKHJlc3BvbnNlRXJyb3JPYmoudmFsdWUpKSB7XG4gICAgICAgIG9yaWdNZXNzYWdlID0gcmVzcG9uc2VFcnJvck9iai52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoXy5pc1BsYWluT2JqZWN0KHJlc3BvbnNlRXJyb3JPYmoudmFsdWUpICYmIF8uaXNTdHJpbmcocmVzcG9uc2VFcnJvck9iai52YWx1ZS5tZXNzYWdlKSkge1xuICAgICAgICBvcmlnTWVzc2FnZSA9IHJlc3BvbnNlRXJyb3JPYmoudmFsdWUubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3VwZXIoXy5pc0VtcHR5KGVycikgPyBgUHJveHkgcmVxdWVzdCB1bnN1Y2Nlc3NmdWwuICR7b3JpZ01lc3NhZ2V9YCA6IGVycik7XG5cbiAgICB0aGlzLnczY1N0YXR1cyA9IEhUVFBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVDtcblxuICAgIC8vIElmIHRoZSByZXNwb25zZSBlcnJvciBpcyBhbiBvYmplY3QgYW5kIHZhbHVlIGlzIGFuIG9iamVjdCwgaXQncyBhIFczQyBlcnJvciAoZm9yIEpTT05XUCB2YWx1ZSBpcyBhIHN0cmluZylcbiAgICBpZiAoXy5pc1BsYWluT2JqZWN0KHJlc3BvbnNlRXJyb3JPYmoudmFsdWUpICYmIF8uaGFzKHJlc3BvbnNlRXJyb3JPYmoudmFsdWUsICdlcnJvcicpKSB7XG4gICAgICB0aGlzLnczYyA9IHJlc3BvbnNlRXJyb3JPYmoudmFsdWU7XG4gICAgICB0aGlzLnczY1N0YXR1cyA9IGh0dHBTdGF0dXMgfHwgSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmpzb253cCA9IHJlc3BvbnNlRXJyb3JPYmo7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWN0dWFsRXJyb3IgKCkge1xuICAgIC8vIElmIGl0J3MgTUpTT05XUCBlcnJvciwgcmV0dXJucyBhY3R1YWwgZXJyb3IgY2F1c2UgZm9yIHJlcXVlc3QgZmFpbHVyZSBiYXNlZCBvbiBganNvbndwLnN0YXR1c2BcbiAgICBpZiAodXRpbC5oYXNWYWx1ZSh0aGlzLmpzb253cCkgJiYgdXRpbC5oYXNWYWx1ZSh0aGlzLmpzb253cC5zdGF0dXMpICYmIHV0aWwuaGFzVmFsdWUodGhpcy5qc29ud3AudmFsdWUpKSB7XG4gICAgICByZXR1cm4gZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUodGhpcy5qc29ud3Auc3RhdHVzLCB0aGlzLmpzb253cC52YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlsLmhhc1ZhbHVlKHRoaXMudzNjKSAmJiBfLmlzTnVtYmVyKHRoaXMudzNjU3RhdHVzKSAmJiB0aGlzLnczY1N0YXR1cyA+PSAzMDApIHtcbiAgICAgIHJldHVybiBlcnJvckZyb21XM0NKc29uQ29kZSh0aGlzLnczYy5lcnJvciwgdGhpcy53M2MubWVzc2FnZSB8fCB0aGlzLm1lc3NhZ2UsIHRoaXMudzNjLnN0YWNrdHJhY2UpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFVua25vd25FcnJvcih0aGlzLm1lc3NhZ2UpO1xuICB9XG59XG4vLyBtYXAgb2YgZXJyb3IgY2xhc3MgbmFtZSB0byBlcnJvciBjbGFzc1xuY29uc3QgZXJyb3JzID0ge05vdFlldEltcGxlbWVudGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgTm90SW1wbGVtZW50ZWRFcnJvcixcbiAgICAgICAgICAgICAgICBCYWRQYXJhbWV0ZXJzRXJyb3IsXG4gICAgICAgICAgICAgICAgSW52YWxpZEFyZ3VtZW50RXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoRHJpdmVyRXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoRWxlbWVudEVycm9yLFxuICAgICAgICAgICAgICAgIFVua25vd25Db21tYW5kRXJyb3IsXG4gICAgICAgICAgICAgICAgU3RhbGVFbGVtZW50UmVmZXJlbmNlRXJyb3IsXG4gICAgICAgICAgICAgICAgRWxlbWVudE5vdFZpc2libGVFcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkRWxlbWVudFN0YXRlRXJyb3IsXG4gICAgICAgICAgICAgICAgVW5rbm93bkVycm9yLFxuICAgICAgICAgICAgICAgIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvcixcbiAgICAgICAgICAgICAgICBFbGVtZW50Q2xpY2tJbnRlcmNlcHRlZEVycm9yLFxuICAgICAgICAgICAgICAgIEVsZW1lbnROb3RJbnRlcmFjdGFibGVFcnJvcixcbiAgICAgICAgICAgICAgICBJbnNlY3VyZUNlcnRpZmljYXRlRXJyb3IsXG4gICAgICAgICAgICAgICAgSmF2YVNjcmlwdEVycm9yLFxuICAgICAgICAgICAgICAgIFhQYXRoTG9va3VwRXJyb3IsXG4gICAgICAgICAgICAgICAgVGltZW91dEVycm9yLFxuICAgICAgICAgICAgICAgIE5vU3VjaFdpbmRvd0Vycm9yLFxuICAgICAgICAgICAgICAgIE5vU3VjaENvb2tpZUVycm9yLFxuICAgICAgICAgICAgICAgIEludmFsaWRDb29raWVEb21haW5FcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkQ29vcmRpbmF0ZXNFcnJvcixcbiAgICAgICAgICAgICAgICBVbmFibGVUb1NldENvb2tpZUVycm9yLFxuICAgICAgICAgICAgICAgIFVuZXhwZWN0ZWRBbGVydE9wZW5FcnJvcixcbiAgICAgICAgICAgICAgICBOb0FsZXJ0T3BlbkVycm9yLFxuICAgICAgICAgICAgICAgIFNjcmlwdFRpbWVvdXRFcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3IsXG4gICAgICAgICAgICAgICAgSU1FTm90QXZhaWxhYmxlRXJyb3IsXG4gICAgICAgICAgICAgICAgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yLFxuICAgICAgICAgICAgICAgIEludmFsaWRTZWxlY3RvckVycm9yLFxuICAgICAgICAgICAgICAgIFNlc3Npb25Ob3RDcmVhdGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgTW92ZVRhcmdldE91dE9mQm91bmRzRXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoQWxlcnRFcnJvcixcbiAgICAgICAgICAgICAgICBOb1N1Y2hDb250ZXh0RXJyb3IsXG4gICAgICAgICAgICAgICAgSW52YWxpZENvbnRleHRFcnJvcixcbiAgICAgICAgICAgICAgICBOb1N1Y2hGcmFtZUVycm9yLFxuICAgICAgICAgICAgICAgIFVuYWJsZVRvQ2FwdHVyZVNjcmVlbixcbiAgICAgICAgICAgICAgICBVbmtub3duTWV0aG9kRXJyb3IsXG4gICAgICAgICAgICAgICAgVW5zdXBwb3J0ZWRPcGVyYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICBQcm94eVJlcXVlc3RFcnJvcn07XG5cbi8vIG1hcCBvZiBlcnJvciBjb2RlIHRvIGVycm9yIGNsYXNzXG5jb25zdCBqc29ud3BFcnJvckNvZGVNYXAgPSB7fTtcbmZvciAobGV0IEVycm9yQ2xhc3Mgb2YgXy52YWx1ZXMoZXJyb3JzKSkge1xuICBpZiAoRXJyb3JDbGFzcy5jb2RlKSB7XG4gICAganNvbndwRXJyb3JDb2RlTWFwW0Vycm9yQ2xhc3MuY29kZSgpXSA9IEVycm9yQ2xhc3M7XG4gIH1cbn1cblxuY29uc3QgdzNjRXJyb3JDb2RlTWFwID0ge307XG5mb3IgKGxldCBFcnJvckNsYXNzIG9mIF8udmFsdWVzKGVycm9ycykpIHtcbiAgaWYgKEVycm9yQ2xhc3MuZXJyb3IpIHtcbiAgICB3M2NFcnJvckNvZGVNYXBbRXJyb3JDbGFzcy5lcnJvcigpXSA9IEVycm9yQ2xhc3M7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNVbmtub3duRXJyb3IgKGVycikge1xuICByZXR1cm4gIWVyci5jb25zdHJ1Y3Rvci5uYW1lIHx8XG4gICAgICAgICAhXy52YWx1ZXMoZXJyb3JzKS5maW5kKGZ1bmN0aW9uIGVxdWFsTmFtZXMgKGVycm9yKSB7XG4gICAgICAgICAgIHJldHVybiBlcnJvci5uYW1lID09PSBlcnIuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBpc0Vycm9yVHlwZSAoZXJyLCB0eXBlKSB7XG4gIC8vIGBuYW1lYCBwcm9wZXJ0eSBpcyB0aGUgY29uc3RydWN0b3IgbmFtZVxuICBpZiAodHlwZS5uYW1lID09PSBQcm90b2NvbEVycm9yLm5hbWUpIHtcbiAgICAvLyBganNvbndwQ29kZWAgaXMgYDBgIG9uIHN1Y2Nlc3NcbiAgICByZXR1cm4gISFlcnIuanNvbndwQ29kZTtcbiAgfSBlbHNlIGlmICh0eXBlLm5hbWUgPT09IFByb3h5UmVxdWVzdEVycm9yLm5hbWUpIHtcbiAgICAvLyBgc3RhdHVzYCBpcyBgMGAgb24gc3VjY2Vzc1xuICAgIGlmIChlcnIuanNvbndwKSB7XG4gICAgICByZXR1cm4gISFlcnIuanNvbndwLnN0YXR1cztcbiAgICB9XG5cbiAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGVyci53M2MpKSB7XG4gICAgICByZXR1cm4gXy5pc051bWJlcihlcnIudzNjU3RhdHVzKSAmJiBlcnIudzNjU3RhdHVzID49IDMwMDtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGVyci5jb25zdHJ1Y3Rvci5uYW1lID09PSB0eXBlLm5hbWU7XG59XG5cbi8qKlxuICogUmV0cmlldmUgYW4gZXJyb3IgZGVyaXZlZCBmcm9tIE1KU09OV1Agc3RhdHVzXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZSBKU09OV1Agc3RhdHVzIGNvZGVcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gdmFsdWUgVGhlIGVycm9yIG1lc3NhZ2UsIG9yIGFuIG9iamVjdCB3aXRoIGEgYG1lc3NhZ2VgIHByb3BlcnR5XG4gKiBAcmV0dXJuIHtQcm90b2NvbEVycm9yfSBUaGUgZXJyb3IgdGhhdCBpcyBhc3NvY2lhdGVkIHdpdGggcHJvdmlkZWQgSlNPTldQIHN0YXR1cyBjb2RlXG4gKi9cbmZ1bmN0aW9uIGVycm9yRnJvbU1KU09OV1BTdGF0dXNDb2RlIChjb2RlLCB2YWx1ZSA9ICcnKSB7XG4gIC8vIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBwdWxsIG1lc3NhZ2UgZnJvbSBpdCwgb3RoZXJ3aXNlIHVzZSB0aGUgcGxhaW5cbiAgLy8gdmFsdWUsIG9yIGRlZmF1bHQgdG8gYW4gZW1wdHkgc3RyaW5nLCBpZiBudWxsXG4gIGNvbnN0IG1lc3NhZ2UgPSAodmFsdWUgfHwge30pLm1lc3NhZ2UgfHwgdmFsdWUgfHwgJyc7XG4gIGlmIChjb2RlICE9PSBVbmtub3duRXJyb3IuY29kZSgpICYmIGpzb253cEVycm9yQ29kZU1hcFtjb2RlXSkge1xuICAgIG1qc29ud3BMb2cuZGVidWcoYE1hdGNoZWQgSlNPTldQIGVycm9yIGNvZGUgJHtjb2RlfSB0byAke2pzb253cEVycm9yQ29kZU1hcFtjb2RlXS5uYW1lfWApO1xuICAgIHJldHVybiBuZXcganNvbndwRXJyb3JDb2RlTWFwW2NvZGVdKG1lc3NhZ2UpO1xuICB9XG4gIG1qc29ud3BMb2cuZGVidWcoYE1hdGNoZWQgSlNPTldQIGVycm9yIGNvZGUgJHtjb2RlfSB0byBVbmtub3duRXJyb3JgKTtcbiAgcmV0dXJuIG5ldyBVbmtub3duRXJyb3IobWVzc2FnZSk7XG59XG5cbi8qKlxuICogUmV0cmlldmUgYW4gZXJyb3IgZGVyaXZlZCBmcm9tIFczQyBKU09OIENvZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFczQyBlcnJvciBzdHJpbmcgKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNoYW5kbGluZy1lcnJvcnMgYEpTT04gRXJyb3IgQ29kZWAgY29sdW1uKVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgdGhlIGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7P3N0cmluZ30gc3RhY2t0cmFjZSBhbiBvcHRpb25hbCBlcnJvciBzdGFja3RyYWNlXG4gKiBAcmV0dXJuIHtQcm90b2NvbEVycm9yfSAgVGhlIGVycm9yIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBXM0MgZXJyb3Igc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGVycm9yRnJvbVczQ0pzb25Db2RlIChjb2RlLCBtZXNzYWdlLCBzdGFja3RyYWNlID0gbnVsbCkge1xuICBpZiAoY29kZSAmJiB3M2NFcnJvckNvZGVNYXBbY29kZS50b0xvd2VyQ2FzZSgpXSkge1xuICAgIHczY0xvZy5kZWJ1ZyhgTWF0Y2hlZCBXM0MgZXJyb3IgY29kZSAnJHtjb2RlfScgdG8gJHt3M2NFcnJvckNvZGVNYXBbY29kZS50b0xvd2VyQ2FzZSgpXS5uYW1lfWApO1xuICAgIGNvbnN0IHJlc3VsdEVycm9yID0gbmV3IHczY0Vycm9yQ29kZU1hcFtjb2RlLnRvTG93ZXJDYXNlKCldKG1lc3NhZ2UpO1xuICAgIHJlc3VsdEVycm9yLnN0YWNrdHJhY2UgPSBzdGFja3RyYWNlO1xuICAgIHJldHVybiByZXN1bHRFcnJvcjtcbiAgfVxuICB3M2NMb2cuZGVidWcoYE1hdGNoZWQgVzNDIGVycm9yIGNvZGUgJyR7Y29kZX0nIHRvIFVua25vd25FcnJvcmApO1xuICBjb25zdCByZXN1bHRFcnJvciA9IG5ldyBVbmtub3duRXJyb3IobWVzc2FnZSk7XG4gIHJlc3VsdEVycm9yLnN0YWNrdHJhY2UgPSBzdGFja3RyYWNlO1xuICByZXR1cm4gcmVzdWx0RXJyb3I7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBBcHBpdW0gZXJyb3IgdG8gcHJvcGVyIFczQyBIVFRQIHJlc3BvbnNlXG4gKiBAcGFyYW0ge1Byb3RvY29sRXJyb3J9IGVyciBUaGUgZXJyb3IgdGhhdCBuZWVkcyB0byBiZSB0cmFuc2xhdGVkXG4gKi9cbmZ1bmN0aW9uIGdldFJlc3BvbnNlRm9yVzNDRXJyb3IgKGVycikge1xuICBsZXQgaHR0cFN0YXR1cztcblxuICAvLyBXM0MgZGVmaW5lZCBlcnJvciBtZXNzYWdlIChodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNkZm4tZXJyb3ItY29kZSlcbiAgbGV0IHczY0Vycm9yU3RyaW5nO1xuXG4gIGlmICghZXJyLnczY1N0YXR1cykge1xuICAgIGVyciA9IHV0aWwuaGFzVmFsdWUoZXJyLnN0YXR1cylcbiAgICAgIC8vIElmIGl0J3MgYSBKU09OV1AgZXJyb3IsIGZpbmQgY29ycmVzcG9uZGluZyBlcnJvclxuICAgICAgPyBlcnJvckZyb21NSlNPTldQU3RhdHVzQ29kZShlcnIuc3RhdHVzLCBlcnIudmFsdWUpXG4gICAgICA6IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKGVyci5tZXNzYWdlKTtcbiAgfVxuXG4gIGlmIChpc0Vycm9yVHlwZShlcnIsIGVycm9ycy5CYWRQYXJhbWV0ZXJzRXJyb3IpKSB7XG4gICAgLy8gcmVzcG9uZCB3aXRoIGEgNDAwIGlmIHdlIGhhdmUgYmFkIHBhcmFtZXRlcnNcbiAgICB3M2NMb2cuZGVidWcoYEJhZCBwYXJhbWV0ZXJzOiAke2Vycn1gKTtcbiAgICB3M2NFcnJvclN0cmluZyA9IEJhZFBhcmFtZXRlcnNFcnJvci5lcnJvcigpO1xuICB9IGVsc2Uge1xuICAgIHczY0Vycm9yU3RyaW5nID0gZXJyLmVycm9yO1xuICB9XG5cbiAgaHR0cFN0YXR1cyA9IGVyci53M2NTdGF0dXM7XG5cbiAgaWYgKCF3M2NFcnJvclN0cmluZykge1xuICAgIHczY0Vycm9yU3RyaW5nID0gVW5rbm93bkVycm9yLmVycm9yKCk7XG4gIH1cblxuICBsZXQgaHR0cFJlc0JvZHkgPSB7XG4gICAgdmFsdWU6IHtcbiAgICAgIGVycm9yOiB3M2NFcnJvclN0cmluZyxcbiAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgICAgc3RhY2t0cmFjZTogZXJyLnN0YWNrdHJhY2UgfHwgZXJyLnN0YWNrLFxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIFtodHRwU3RhdHVzLCBodHRwUmVzQm9keV07XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBBcHBpdW0gZXJyb3IgdG8gYSBwcm9wZXIgSlNPTldQIHJlc3BvbnNlXG4gKiBAcGFyYW0ge1Byb3RvY29sRXJyb3J9IGVyciBUaGUgZXJyb3IgdG8gYmUgY29udmVydGVkXG4gKi9cbmZ1bmN0aW9uIGdldFJlc3BvbnNlRm9ySnNvbndwRXJyb3IgKGVycikge1xuICBpZiAoaXNVbmtub3duRXJyb3IoZXJyKSkge1xuICAgIGVyciA9IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKGVycik7XG4gIH1cbiAgLy8gTUpTT05XUCBlcnJvcnMgYXJlIHVzdWFsbHkgNTAwIHN0YXR1cyBjb2RlIHNvIHNldCBpdCB0byB0aGF0IGJ5IGRlZmF1bHRcbiAgbGV0IGh0dHBTdGF0dXMgPSBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICBsZXQgaHR0cFJlc0JvZHkgPSB7XG4gICAgc3RhdHVzOiBlcnIuanNvbndwQ29kZSxcbiAgICB2YWx1ZToge1xuICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICB9XG4gIH07XG5cbiAgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLkJhZFBhcmFtZXRlcnNFcnJvcikpIHtcbiAgICAvLyByZXNwb25kIHdpdGggYSA0MDAgaWYgd2UgaGF2ZSBiYWQgcGFyYW1ldGVyc1xuICAgIG1qc29ud3BMb2cuZGVidWcoYEJhZCBwYXJhbWV0ZXJzOiAke2Vycn1gKTtcbiAgICBodHRwU3RhdHVzID0gSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICAgIGh0dHBSZXNCb2R5ID0gZXJyLm1lc3NhZ2U7XG4gIH0gZWxzZSBpZiAoaXNFcnJvclR5cGUoZXJyLCBlcnJvcnMuTm90WWV0SW1wbGVtZW50ZWRFcnJvcikgfHxcbiAgICAgICAgICAgICBpc0Vycm9yVHlwZShlcnIsIGVycm9ycy5Ob3RJbXBsZW1lbnRlZEVycm9yKSkge1xuICAgIC8vIHJlc3BvbmQgd2l0aCBhIDUwMSBpZiB0aGUgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZFxuICAgIGh0dHBTdGF0dXMgPSBIVFRQU3RhdHVzQ29kZXMuTk9UX0lNUExFTUVOVEVEO1xuICB9IGVsc2UgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLk5vU3VjaERyaXZlckVycm9yKSkge1xuICAgIC8vIHJlc3BvbmQgd2l0aCBhIDQwNCBpZiB0aGVyZSBpcyBubyBkcml2ZXIgZm9yIHRoZSBzZXNzaW9uXG4gICAgaHR0cFN0YXR1cyA9IEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7XG4gIH1cblxuXG4gIHJldHVybiBbaHR0cFN0YXR1cywgaHR0cFJlc0JvZHldO1xufVxuXG5leHBvcnQge1xuICBQcm90b2NvbEVycm9yLCBlcnJvcnMsIGlzRXJyb3JUeXBlLCBpc1Vua25vd25FcnJvcixcbiAgZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUsIGVycm9yRnJvbVczQ0pzb25Db2RlLFxuICBnZXRSZXNwb25zZUZvclczQ0Vycm9yLCBnZXRSZXNwb25zZUZvckpzb253cEVycm9yLFxufTtcbiJdLCJmaWxlIjoibGliL3Byb3RvY29sL2Vycm9ycy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
