/* eslint-disable */
/* @TODO: Re-enable ESLint - See line 43.  */

import path from 'path';
import { config as buildConfig } from './wdio.conf';
import DesInfo from './des.info';

import { appiumbase } from './appium.base';
import { DESSuites } from './suites/des.suites';

buildConfig.baseUrl = '/';
buildConfig.maxInstances = 1;
// buildConfig.path = '/'

buildConfig.specs = [
  './src/features/des/**/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
  './src/steps/des/*.ts',
);

buildConfig.cucumberOpts!.timeout = 150000; // Allow for the application to install
buildConfig.suites = DESSuites;

buildConfig.services = (buildConfig.services ? buildConfig.services : [])
  .concat([
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

// @TODO: Avoid this syntax `exports.config` to resolve ESLint error's
exports.config = {
  ...buildConfig,
  capabilities: [
    {
      ...appiumbase,
      platformName: DesInfo.platformName,
      platformVersion: DesInfo.platFormVersion,
      deviceName: DesInfo.localDeviceName,
      app: DesInfo.localAppPath,
      disableAnimations: true,
    },
  ],
};
