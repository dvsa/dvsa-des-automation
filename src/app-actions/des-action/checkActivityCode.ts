import myJournalPageobject from '../../pageobjects/des/myJournal.pageobject';

export default async (
  appRef: string,
  expectedText: string,
) => {
  await myJournalPageobject.checkActivityCode(appRef, expectedText);
};
