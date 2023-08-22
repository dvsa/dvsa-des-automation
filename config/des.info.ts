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
    return '16.4'; // pass the platform version
  }

  get platformName() {
    return 'iOS';
  }

  get localAppPath() {
    return './apps/App.app';
  }
}
export default new DesInfo();
