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
    return process.env.BROWSERSTACK_APP_ID || 'bs://ab9ee684ed6d41cf928efbb335267b8949deb606';
  }

  get localAppPath() {
    return './apps/App.app';
  }
}
export default new DesInfo();
