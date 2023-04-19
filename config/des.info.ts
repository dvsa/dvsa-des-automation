class DesInfo {
  // Return a random device

  get projectName() {
    return 'DES WDIO';
  }

  get deviceName() {
    return 'iPad 8th';
  }

  get localDeviceName() {
    return 'iPad (9th generation)';
  }

  get platFormVersion() {
    return '16.1'; // pass the platform version
  }

  get platformName() {
    return 'iOS';
  }

  get appName() {
    return process.env.BROWSERSTACK_APP_ID || 'bs://beb82c9b19b3677b42610f8fb56766c9f0d0f16e';
  }

  get localAppPath() {
    return './apps/App.app';
  }
}
export default new DesInfo();
