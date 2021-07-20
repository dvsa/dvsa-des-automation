import SearchPage from '../../pageobjects/search/search.pageobject'

export default (
    vehicleID: string
) => {
    SearchPage.searchVehicle(vehicleID);
};

