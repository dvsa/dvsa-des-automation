import { config as buildConfig } from './wdio.conf';
import { bscapabilities, bsconfig } from './wdio.bsbase';
import DESInfo from './des.info';
import { DESSuites } from './suites/des.suites';

buildConfig.baseUrl = '/';
buildConfig.maxInstances = 5;

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
  ...buildConfig,
  ...bsconfig,
  capabilities: [
    {
      ...bscapabilities,
      os_version: '14',
      device: DESInfo.deviceName,
      platformName: DESInfo.platformName,
      app: DESInfo.appName,
      project: DESInfo.projectName,
      build: 'DES WDIO Browserstack',
      name: bsconfig.user,
      'browserstack.os_version': '14',
      'browserstack.device': 'iPad 8th',
      'browserstack.appium_version': '1.22.0',
      'browserstack.idle.timeout': 150,
    },
  ],
};
