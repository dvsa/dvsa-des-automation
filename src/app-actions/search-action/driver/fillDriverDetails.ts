import driverdetailsPageobject from "../../../pageobjects/search/driverdetails.pageobject";


export default (table: any) => {

    const data = table.rowsHash();
    
    driverdetailsPageobject.fillDriverDetailsFromDataTable(data);
    
};