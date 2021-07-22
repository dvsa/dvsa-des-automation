import { config as buildConfig } from './wdio.conf';
import { bscapabilities, bsconfig } from './wdio.bsbase';
import DesInfo from "./des.info";
import path from 'path';
import { DesSuites } from './suites/des.suites';

buildConfig.baseUrl = '/';
buildConfig.maxInstances = 5;

buildConfig.specs = [
    './src/features/des/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
    './src/steps/des/*.ts'
);

buildConfig.suites = DesSuites;

buildConfig.services = (buildConfig.services ? buildConfig.services : []).concat([
    'browserstack'
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
            os_version: DesInfo.platFormVersion,
            device: DesInfo.deviceName,
            platformName: DesInfo.platformName,
            app: DesInfo.appName,
            project: DesInfo.projectName,
            build: "DES WDIO Browserstack",
            name: bsconfig.user,
        }
    ]
};

// exports.config = {
//     ...buildConfig,
//     ...bsconfig,
//     capabilities: [
//         {
//             "os_version": "14.3",
//             "device": DesInfo.deviceName,
//             "platformName": "iOS",
//             "app": DesInfo.appName,
//             "project": DesInfo.projectName,
//             "build": "DES WDIO Browserstack",
//             "name": bsconfig.user,
//             "browserstack.appium_version": '1.20.2',
//             "browserstack.acceptInsecureCerts": "true",
//             "browserstack.debug": "true",
//             "browserstack.networkLogs": "false",
//             "browserstack.appiumLogs": "false",
//             "browserstack.deviceLogs": "false",
//             "disableAnimations": "true",
//             "real_mobile" : "true",
//             autoAcceptAlerts: true,
//             fullContextList: true,
//             autoWebview: true,
//         }
//     ]
// }
