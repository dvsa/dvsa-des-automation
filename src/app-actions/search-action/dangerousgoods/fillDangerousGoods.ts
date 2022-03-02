import dangerousgoodsdetailsPageobject from '../../../pageobjects/search/dangerousgoodsdetails.pageobject';

export default (table: any) => {
  const data = table.rowsHash();

  dangerousgoodsdetailsPageobject.fillDangeroudGoodsFromDataTable(data);
};
