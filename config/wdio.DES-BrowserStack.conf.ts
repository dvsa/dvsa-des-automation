import { config as buildConfig } from './wdio.conf';
import { bscapabilities, bsconfig } from './wdio.bsbase';
import DESInfo from './des.info';
import {
  batch1,
  batch2,
  DESSuites,
} from './suites/des.suites';

buildConfig.baseUrl = '/';
buildConfig.maxInstances = 15;

buildConfig.specs = [
  './src/features/des/**/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
  './src/steps/des/*.ts',
);

buildConfig.suites = DESSuites;

buildConfig.services = (buildConfig.services ? buildConfig.services : []).concat([
  'browserstack',
]);

buildConfig.onPrepare = async () => {
  // browser.setTimeout({ 'pageLoad': 10000 });
};

exports.config = {
  services: ['shared-store'],
  ...buildConfig,
  ...bsconfig,
  commonCapabilities: {
    ...bscapabilities,
    os_version: DESInfo.platFormVersion,
    device: DESInfo.deviceName,
    platformName: DESInfo.platformName,
    app: DESInfo.appName,
    project: DESInfo.projectName,
    build: 'DES WDIO Browserstack',
    name: bsconfig.user,
    fullContextList: true,
    autoWebview: true,
    autoAcceptAlerts: false,
    acceptSslCert: true,
    disableAnimations: true,
    'browserstack.appium_version': '1.21.0',
    'browserstack.idle.timeout': 150,
  },
  capabilities: [
    {
      os_version: '14',
      device: 'iPad 8th',
      exclude: [
        ...batch2,
      ],
    },
    {
      os_version: '15',
      device: 'iPad 9th',
      exclude: [
        ...batch1,
      ],
    },
  ],
};

// Code to support common capabilities
// (see https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio/parallelize-tests)
exports.config.capabilities.forEach((caps: any) => {
  // eslint-disable-next-line
  for (const i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
