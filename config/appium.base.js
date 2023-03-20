"use strict";
// export const appiumbase = {
//   maxInstances: 1,
//   usePrebuiltWDA: false,
//   autoLaunch: true,
//   wdaLocalPort: 8200,
//   fullContextList: true,
//   showXcodeLog: true,
//   autoWebview: true,
//   useNewWDA: true, // Set this to true to reinstall the driver everytime
//   automationName: 'XCUITest',
//   autoAcceptAlerts: false,
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.appiumbase = void 0;
// https://appium.io/docs/en/writing-running-appium/caps/
// https://github.com/appium/appium-xcuitest-driver/blob/master/docs/capabilities.md
exports.appiumbase = {
    maxInstances: 1,
    platformName: 'iOS',
    app: './apps/App.app',
    fullReset: true,
    noReset: false,
    usePrebuiltWDA: false,
    autoLaunch: true,
    wdaLocalPort: 8200,
    fullContextList: true,
    showXcodeLog: true,
    autoWebview: true,
    useNewWDA: false,
    automationName: 'XCUITest',
    autoAcceptAlerts: false,
    // enable to run without simulator UI
    // isHeadless: true,
};
