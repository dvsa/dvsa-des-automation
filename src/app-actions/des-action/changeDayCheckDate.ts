import MyJournalPageobject from '../../pageobjects/des/myJournal.pageobject';

export default async (
  direction:'back'|'forward',
  days:number|string,
) => {
  const daysInt = typeof days === 'string' ? parseInt(days, 10) : days;
  await MyJournalPageobject.changeDayCheckDate(direction, daysInt);
};
