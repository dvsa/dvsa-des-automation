import DataTable from '@cucumber/cucumber/lib/models/data_table';
import debriefScreenPageobject from '../../pageobjects/des/debriefScreen.pageobject';

export default async (table: DataTable): Promise<void> => {
  const data = table.hashes();

  await debriefScreenPageobject.checkCorrectFaults(data);
};
