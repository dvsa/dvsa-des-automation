"use strict";
/* eslint-disable */
/* @TODO: Re-enable ESLint */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wdio_conf_1 = require("./wdio.conf");
const wdio_bsbase_1 = require("./wdio.bsbase");
const des_info_1 = __importDefault(require("./des.info"));
const des_suites_1 = require("./suites/des.suites");
wdio_conf_1.config.baseUrl = '/';
wdio_conf_1.config.maxInstances = 15;
wdio_conf_1.config.specs = [
    './src/features/des/**/**/*.feature',
];
wdio_conf_1.config.cucumberOpts.require.push('./src/steps/des/*.ts');
wdio_conf_1.config.suites = des_suites_1.DESSuites;
wdio_conf_1.config.services = (wdio_conf_1.config.services ? wdio_conf_1.config.services : []).concat([
    'browserstack',
]);
wdio_conf_1.config.onPrepare = async () => {
    // browser.setTimeout({ 'pageLoad': 10000 });
};
exports.config = {
    services: ['shared-store'],
    ...wdio_conf_1.config,
    ...wdio_bsbase_1.bsconfig,
    commonCapabilities: {
        ...wdio_bsbase_1.bscapabilities,
        os_version: des_info_1.default.platFormVersion,
        device: des_info_1.default.deviceName,
        platformName: des_info_1.default.platformName,
        app: des_info_1.default.appName,
        project: des_info_1.default.projectName,
        build: 'DES WDIO Browserstack',
        name: wdio_bsbase_1.bsconfig.user,
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
                ...des_suites_1.batch2,
            ],
        },
        {
            os_version: '15',
            device: 'iPad 9th',
            exclude: [
                ...des_suites_1.batch1,
            ],
        },
    ],
};
// Code to support common capabilities
// (see https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio/parallelize-tests)
exports.config.capabilities.forEach((caps) => {
    // eslint-disable-next-line
    for (const i in exports.config.commonCapabilities)
        caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
