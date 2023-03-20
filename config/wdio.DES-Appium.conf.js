"use strict";
/* eslint-disable */
/* @TODO: Re-enable ESLint - See line 43.  */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const wdio_conf_1 = require("./wdio.conf");
const des_info_1 = __importDefault(require("./des.info"));
const appium_base_1 = require("./appium.base");
const des_suites_1 = require("./suites/des.suites");
wdio_conf_1.config.baseUrl = '/';
wdio_conf_1.config.maxInstances = 1;
// buildConfig.path = '/'
wdio_conf_1.config.specs = [
    './src/features/des/**/**/*.feature',
];
wdio_conf_1.config.cucumberOpts.require.push('./src/steps/des/*.ts');
// buildConfig.cucumberOpts!.timeout = 150000; // Allow for the application to install
wdio_conf_1.config.suites = des_suites_1.DESSuites;
wdio_conf_1.config.services = (wdio_conf_1.config.services ? wdio_conf_1.config.services : [])
    .concat([
    ['appium', {
            command: 'appium',
            args: {
                address: '127.0.0.1',
                commandTimeout: '7200',
                sessionOverride: false,
                debugLogSpacing: true,
                relaxedSecurity: true,
            },
            logPath: path_1.default.join('./reports/appiumlogs'),
        }],
]);
wdio_conf_1.config.port = 4723;
// @TODO: Avoid this syntax `exports.config` to resolve ESLint error's
exports.config = {
    ...wdio_conf_1.config,
    capabilities: [
        {
            ...appium_base_1.appiumbase,
            wdaLocalPort: 8210,
            platformName: des_info_1.default.platformName,
            platformVersion: des_info_1.default.platFormVersion,
            deviceName: des_info_1.default.localDeviceName,
            app: des_info_1.default.localAppPath,
            disableAnimations: true,
        },
    ],
};
