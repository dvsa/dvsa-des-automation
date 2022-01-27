import opeatorDetails from "../../../pageobjects/search/operatordetails.pageobject";


export default (table: any) => {

    const data = table.rowsHash();
    
    opeatorDetails.fillOperatorDetailsFromDataTable(data)
    
};           