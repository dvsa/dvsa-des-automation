const faker = require("faker/locale/en_GB");

class DesInfo {
    // Return a random device

    get projectName(){
        return "DES WDIO";
    }

    get deviceName() {
        return 'iPad 8th'
    }

    get localDeviceName() {
        return 'iPad Pro (10.5-inch)';
    }

    get platFormVersion() {
        return '14'; // pass the platform version
    }

    get platformName(){
        return 'iOS';
    }

    get appName() {
        return "bs://d10b79bc894dc53c0f533bf0e73130561e00914e" || process.env.BROWSERSTACK_APP_ID;
    }

    get localAppPath() {
        return './apps/App.app';
    }
}
export default new DesInfo()
