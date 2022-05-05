import FinalOutcomePageObject from '../../pageobjects/des/finalOutcomeScreen.pageobject';

export default async (): Promise<void> => {
  await FinalOutcomePageObject.completeNonPassedFinalOutcomeTerminatePage();
};
