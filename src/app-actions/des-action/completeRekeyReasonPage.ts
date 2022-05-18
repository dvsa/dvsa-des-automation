import DataTable from '@cucumber/cucumber/lib/models/data_table';
import RekeyReasonPageObject from '../../pageobjects/des/rekeyReason.pageobject';

export default async (table: DataTable): Promise<void> => {
  const data = table.rowsHash();

  await RekeyReasonPageObject.completeRekeyReasonPage(data);
};
