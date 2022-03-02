import trailerdetailsPageobject from '../../../pageobjects/search/trailerdetails.pageobject';

export default (table: any) => {
  const data = table.rowsHash();

  trailerdetailsPageobject.fillTrailerDetailsFromDataTable(data);
};
