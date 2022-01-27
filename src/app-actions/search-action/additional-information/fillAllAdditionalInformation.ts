import additionalInformationPageobject from "../../../pageobjects/search/additionalinformation.pageobject";


export default (table: any) => {

    const data = table.rowsHash();
    
    additionalInformationPageobject.fillAllAdditionalInformationFromDataTable(data);
    
};