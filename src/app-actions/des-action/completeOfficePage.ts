import DataTable from '@cucumber/cucumber/lib/models/data_table';
import OfficePageObject from '../../pageobjects/des/office.pageobject';

export default async (table: DataTable): Promise<void> => {
  const data = table.rowsHash();

  await OfficePageObject.completeOfficePage(data);
};
