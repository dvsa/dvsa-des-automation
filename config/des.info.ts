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
        return 'iPhone 12 Pro Max';
    }

    get platFormVersion() {
        return '14.4'; // pass the platform version
    }

    get platformName(){
        return 'iOS';
    }

    get appName() {

        return process.env.BROWSERSTACK_APP_ID || "bs://b7165f684774df6eb7212cf2b22656965d347454";

    }

    get localAppPath() {
        return './apps/App.app';
    }
}
export default new DesInfo()
