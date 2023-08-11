class DesInfo {
  // Return a random device

  get projectName() {
    return 'DES WDIO';
  }

  get deviceName() {
    return 'iPad 8th';
  }

  get localDeviceName() {
    return 'iPad (8th generation)';
  }

  get platFormVersion() {
    return '16.1'; // pass the platform version
  }

  get platformName() {
    return 'iOS';
  }

  get localAppPath() {
    return './apps/App.app';
  }
}
export default new DesInfo();
