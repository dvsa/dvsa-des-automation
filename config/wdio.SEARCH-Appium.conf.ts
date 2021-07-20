import { config as buildConfig } from './wdio.conf';
import SearchInfo from "./search.info";

import { appiumbase } from './appium.base';
import { SearchSuites } from './suites/search.suites';
import path from 'path';

buildConfig.baseUrl = '/';
buildConfig.maxInstances = 5;
// buildConfig.path = '/'

buildConfig.specs = [
    './src/features/search/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
    './src/steps/search/*.ts'
);

buildConfig.cucumberOpts!.timeout = 150000; // Allow for the application to install
buildConfig.suites = SearchSuites;

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
            platformName: SearchInfo.platformName,
            platformVersion: SearchInfo.platFormVersion,
            deviceName: 'iPhone 12',
            // app: '/Users/lee/IonicProjects/dvsa-automation-boilerplate/apps/SearchMobile.app',
            app: SearchInfo.localAppPath,
            disableAnimations: true,
            fullReset: false, // Change this to true to reinstall the application
            noReset: false // noReset just clears the app data, such as its cache.
        }
    ]
}
