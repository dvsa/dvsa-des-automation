const faker = require("faker/locale/en_GB");

class SearchInfo {
    // Return a random device

    get projectName(){
        return "Search WDIO";
    }

    get deviceName() {
        return ['iPhone 12', 'iPhone 12 Pro Max', 'iPhone 11', 'iPhone 11 Pro Max', 'iPhone XS'][Number.parseInt(faker.datatype.number({min: 0, max: 4, precision: 1}))]
    }

    get localDeviceName() {
        return 'iPhone 12';
    }

    get platFormVersion() {
        return '14.4'; // pass the platform version
    }

    get platformName(){
        return 'iOS';
    }

    get appName() {
        return "bs://97b9b6675f9db6a1be3557eaa92362715be23134" || process.env.BROWSERSTACK_APP_ID;
    }
    
    get localAppPath() {
        return './apps/SearchMobile.app';
    }
}
export default new SearchInfo()