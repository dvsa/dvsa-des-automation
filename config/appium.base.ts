// https://appium.io/docs/en/writing-running-appium/caps/
// https://github.com/appium/appium-xcuitest-driver/blob/master/docs/capabilities.md
export const appiumbase = {
  maxInstances: 1,
  fullReset: false, // Change this to true to reinstall the application
  noReset: false, // noReset just clears the app data, such as its cache.
  usePrebuiltWDA: false,
  autoLaunch: true,
  wdaLocalPort: 8200,
  fullContextList: true,
  showXcodeLog: true,
  autoWebview: true,
  useNewWDA: true, // Set this to true to reinstall the driver everytime
  automationName: 'XCUITest',
  autoAcceptAlerts: false,
  // enable to run without simulator UI
  // isHeadless: true,
  includeSafariInWebviews: true,
};
