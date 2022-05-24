import myJournalPageobject from '../../pageobjects/des/myJournal.pageobject';

export default async (
  selector: string,
) => {
  await myJournalPageobject.startTest(selector);
};
