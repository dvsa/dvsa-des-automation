import offencedetailsPageobject from '../../../pageobjects/search/offencedetails.pageobject';

export default (table: any) => {
  const data = table.rowsHash();

  offencedetailsPageobject.fillOffencesDetailsFromDataTable(data);
};
