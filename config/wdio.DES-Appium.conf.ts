import { config as buildConfig } from './wdio.conf';
import DESInfo from "./des.info";

import { appiumbase } from './appium.base';
import { DESSuites } from './suites/des.suites';
import path from 'path';

buildConfig.baseUrl = '/';
buildConfig.maxInstances = 5;
// buildConfig.path = '/'

buildConfig.specs = [
    './src/features/search/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
    './src/steps/des/*.ts'
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
        logPath: path.join('./reports/appiumlogs')
    }]
]);

buildConfig.port = 4723;

exports.config = {
    ...buildConfig,
    capabilities: [
        {
            ...appiumbase,
            platformName: DESInfo.platformName,
            platformVersion: DESInfo.platFormVersion,
            deviceName: 'iPad 8',
            // app: '/Users/lee/IonicProjects/dvsa-automation-boilerplate/apps/SearchMobile.app',
            app: DESInfo.localAppPath,
            disableAnimations: true,
            fullReset: false, // Change this to true to reinstall the application
            noReset: false // noReset just clears the app data, such as its cache.
        }
    ]
}
