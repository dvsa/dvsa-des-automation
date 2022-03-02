import journeydetailsPageobject from '../../../pageobjects/search/journeydetails.pageobject';

export default (table: any) => {
  const data = table.rowsHash();

  journeydetailsPageobject.fillJourneyDetailsFromDataTable(data);
};
