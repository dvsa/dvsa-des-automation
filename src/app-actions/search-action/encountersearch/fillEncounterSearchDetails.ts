import encounterSearch from '../../../pageobjects/search/encountersearch.pageobject';

export default (table: any) => {
  const data = table.rowsHash();

  encounterSearch.fillEncounterSearchDetails(data);
};
