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
    return '15.5'; // pass the platform version
  }

  get platformName() {
    return 'iOS';
  }

  get appName() {
    return process.env.BROWSERSTACK_APP_ID || 'bs://7e2fdae5e1ac1161b6792240b66283d04639d037';
  }

  get localAppPath() {
    return './apps/App.app';
  }
}
export default new DesInfo();
