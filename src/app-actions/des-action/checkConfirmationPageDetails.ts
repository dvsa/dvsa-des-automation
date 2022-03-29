import ConfirmationPageObject from '../../pageobjects/des/confirmationPage.pageobject';

export default async (table: any) => {
  const data = table.rowsHash();

  await ConfirmationPageObject.checkPassedConfirmationPageDetails(data);
};
