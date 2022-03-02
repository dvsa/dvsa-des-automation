import operatorvisitsPageobject from '../../../pageobjects/search/operatorvisits.pageobject';

export default (table: any) => {
  const data = table.rowsHash();
  operatorvisitsPageobject.fillOperatorVisitsFromDataTable(data);
};
