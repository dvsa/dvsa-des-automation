import myJournalPageobject from '../../pageobjects/des/myJournal.pageobject';

export default async (
  appRef: string,
) => {
  await myJournalPageobject.startTest(appRef);
};
