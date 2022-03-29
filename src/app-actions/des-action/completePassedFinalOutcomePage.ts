import FinalOutcomePageObject from '../../pageobjects/des/finalOutcomeScreen.pageobject';

export default async (table: any) => {
  const data = table.rowsHash();

  await FinalOutcomePageObject.completePassedFinalOutcomePage(data);
};
