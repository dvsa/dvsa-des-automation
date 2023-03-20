import DataTable from '@cucumber/cucumber/lib/models/data_table';
import CandidateIDPageObject from '../../pageobjects/des/candidateID.pageobject';

export default async (table: DataTable) => {
  const data: Record<string, string> = table.rowsHash();
  await CandidateIDPageObject.completePage(data);
};
