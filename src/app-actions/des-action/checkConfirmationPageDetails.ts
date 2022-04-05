import DataTable from '@cucumber/cucumber/lib/models/data_table';
import ConfirmationPageObject from '../../pageobjects/des/confirmationPage.pageobject';

export default async (table: DataTable): Promise<void> => {
  const data = table.rowsHash();

  await ConfirmationPageObject.checkPassedConfirmationPageDetails(data);
};
