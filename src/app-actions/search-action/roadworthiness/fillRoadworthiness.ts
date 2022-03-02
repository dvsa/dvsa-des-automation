import roadworthinesschecklistPageobject from '../../../pageobjects/search/roadworthinesschecklist.pageobject';

export default (table: any) => {
  const data = table.rowsHash();

  roadworthinesschecklistPageobject.fillRoadworthinessFromDataTable(data);
};
