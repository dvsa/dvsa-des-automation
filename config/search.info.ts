const faker = require("faker/locale/en_GB");

class SearchInfo {
    // Return a random device

    get projectName(){
        return "Search WDIO";
    }

    get deviceName() {
        return ['iPhone 12', 'iPhone 12 Pro Max', 'iPhone 11', 'iPhone 11 Pro Max'][Number.parseInt(faker.datatype.number({min: 0, max: 3, precision: 1}))]
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

        return "bs://7f9ca16cfd78a0fc8f9c2b65b1351ec467443d9c" || process.env.BROWSERSTACK_APP_ID;

    }

    get localAppPath() {
        return './apps/Search Mobile.app';
    }
}
export default new SearchInfo()
