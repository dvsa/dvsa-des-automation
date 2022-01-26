import vehicledetailsPageobject from "../../../pageobjects/search/vehicledetails.pageobject";

export default (table: any) => {

    const data = table.rowsHash();
    
    vehicledetailsPageobject.fillVehicleDetailsFromDataTable(data);
    
};