import path from 'path';
import { config as buildConfig } from './wdio.conf';
import DesInfo from './des.info';

import { appiumbase } from './appium.base';
import { DESSuites } from './suites/des.suites';

buildConfig.baseUrl = '/';
buildConfig.maxInstances = 5;
// buildConfig.path = '/'

buildConfig.specs = [
  './src/features/des/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
  './src/steps/des/*.ts',
);

buildConfig.cucumberOpts!.timeout = 150000; // Allow for the application to install
buildConfig.suites = DESSuites;

buildConfig.services = (buildConfig.services ? buildConfig.services : []).concat([
  ['appium', {
    command: 'appium',
    args: {
      address: '127.0.0.1',
      commandTimeout: '7200',
      sessionOverride: true,
      debugLogSpacing: true,
      relaxedSecurity: true,
    },
    logPath: path.join('./reports/appiumlogs'),
  }],
]);

buildConfig.port = 4723;

exports.config = {
  ...buildConfig,
  capabilities: [
    {
      ...appiumbase,
      platformName: DesInfo.platformName,
      platformVersion: DesInfo.platFormVersion,
      deviceName: 'iPad (8th generation)',
      // app: '/Users/lee/IonicProjects/dvsa-automation-boilerplate/apps/SearchMobile.app',
      app: DesInfo.localAppPath,
      disableAnimations: true,
      fullReset: true, // Change this to true to reinstall the application
      noReset: false, // noReset just clears the app data, such as its cache.
    },
  ],
};
