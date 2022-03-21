class DesInfo {
  // Return a random device

  get projectName() {
    return 'DES WDIO';
  }

  get deviceName() {
    return 'iPad 8th';
  }

  get localDeviceName() {
    return 'iPhone 12 Pro Max';
  }

  get platFormVersion() {
    return '15.2'; // pass the platform version
  }

  get platformName() {
    return 'iOS';
  }

  get appName() {
    return process.env.BROWSERSTACK_APP_ID || 'bs://37d03948eda78915007ce52302eb8fe198c03f8a';
  }

  get localAppPath() {
    return './apps/App.app';
  }
}
export default new DesInfo();
