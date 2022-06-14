import DataTable from '@cucumber/cucumber/lib/models/data_table';
import FinalOutcomePageObject from '../../pageobjects/des/finalOutcomeScreen.pageobject';

export default async (testOutcome:'unsuccessful' | 'terminated', table: DataTable): Promise<void> => {
  const data = table.rowsHash();

  await FinalOutcomePageObject.completeNonPassedFinalOutcomePage(testOutcome, data);
};
