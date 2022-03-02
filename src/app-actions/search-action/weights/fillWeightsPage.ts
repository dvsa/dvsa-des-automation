import weightsPageobject from '../../../pageobjects/search/weights.pageobject';

export default (table: any) => {
  const data = table.rowsHash();

  weightsPageobject.fillWeightsFromDataTable(data);
};
