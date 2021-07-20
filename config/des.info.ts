const faker = require("faker/locale/en_GB");

class DesInfo {
    // Return a random device

    get projectName(){
        return "DES WDIO";
    }

    get deviceName() {
        return ['iPad','iPad'][Number.parseInt(faker.datatype.number({min: 0, max: 4, precision: 1}))]
    }

    get localDeviceName() {
        return 'iPad';
    }

    get platFormVersion() {
        return '14.4'; // pass the platform version
    }

    get platformName(){
        return 'iOS';
    }

    get appName() {
        return "bs://<TODO>" || process.env.BROWSERSTACK_APP_ID;
    }
    
    get localAppPath() {
        return './apps/DES.app';
    }
}
export default new DesInfo()