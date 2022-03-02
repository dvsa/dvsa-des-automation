import fixedpenaltyPageobject from '../../../pageobjects/search/fixedpenalty.pageobject';

export default (table: any) => {
  const data = table.rowsHash();

  fixedpenaltyPageobject.fillFixedPenalty(data);
};
