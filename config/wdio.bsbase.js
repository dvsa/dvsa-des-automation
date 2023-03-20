"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bscapabilities = exports.bsconfig = void 0;
const bscreds_1 = require("../creds/bscreds");
exports.bsconfig = {
    user: bscreds_1.bscreds.user || process.env.BROWSERSTACK_USERNAME,
    key: bscreds_1.bscreds.key || process.env.BROWSERSTACK_ACCESS_KEY,
    host: 'hub.browserstack.com',
};
exports.bscapabilities = {
    acceptSslCert: true,
    disableAnimations: true,
    'browserstack.debug': true,
    'browserstack.local': false,
    'browserstack.networkLogs': true,
    'browserstack.acceptInsecureCerts': true,
    'browserstack.appiumLogs': true,
    'browserstack.deviceLogs': true,
    os_version: '10',
    resolution: '1920x1080',
    browserName: 'Chrome',
    browser_version: 'latest',
    os: 'Windows',
    fullContextList: true,
    autoWebview: true,
    autoAcceptAlerts: false,
};
