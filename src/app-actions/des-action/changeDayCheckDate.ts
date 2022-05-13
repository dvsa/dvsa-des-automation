import MyJournalPageobject from '../../pageobjects/des/myJournal.pageobject';

// eslint-disable-next-line no-unused-vars
export default async (
  direction:'back'|'forward',
  days:number,
) => {
  await MyJournalPageobject.changeDayCheckDate(direction, days);
};
