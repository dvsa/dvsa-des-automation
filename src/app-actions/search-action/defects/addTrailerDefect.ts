import defectPage from "../../../pageobjects/search/defects.pageobject";


export default (defectType:string ,table: any) => {

    const data = table.rowsHash();
    defectPage.addDefectToTrailer(defectType,data)
};