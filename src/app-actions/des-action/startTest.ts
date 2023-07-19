import myJournalPageobject from '../../pageobjects/des/myJournal.pageobject';

export default async (
  rekeyOption: boolean,
  appRef: string,
) => {
  await myJournalPageobject.startTest(rekeyOption, appRef);
};
