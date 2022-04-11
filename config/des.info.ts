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
    return process.env.BROWSERSTACK_APP_ID || 'bs://c78ba014cac4d3275719ac878274bc5f5d56d070';
  }

  get localAppPath() {
    return './apps/App.app';
  }
}
export default new DesInfo();
