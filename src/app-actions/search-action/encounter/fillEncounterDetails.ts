import encounterdetailsPageobject from "../../../pageobjects/search/encounterdetails.pageobject";

export default (table: any) => {

    const data = table.rowsHash();
    
    encounterdetailsPageobject.fillEncounterDetails(data);
    
};