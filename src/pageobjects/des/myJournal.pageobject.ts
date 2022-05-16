import clickElement from '@shared-boilerplate/support/action/clickElement';
import checkEqualsText from '@shared-boilerplate/support/check/checkEqualsText';
import Page from '../base/page';
import { getElementByReference } from '../../../shared/helpers/element-reference-helper';

class MyJournalPageObject extends Page {
  get nextDayButton() { return ('des-my-journal::next-day-btn'); }

  get previousDayButton() { return ('des-my-journal::previous-day-btn'); }

  get dayName() { return ('des-my-journal::day-name'); }

  get dateName() { return ('des-my-journal::date'); }

  async changeDayCheckDate(direction:'back'|'forward', days:number): Promise<void> {
    const gettingDateElementCurrentPage = await $(getElementByReference(this.dateName)).getText();

    let i:number = 0;
    if (direction === 'back') {
      while (i < days) {
        // eslint-disable-next-line no-await-in-loop
        await clickElement('click', 'selector', this.previousDayButton);
        i += 1;
      }
    } else {
      while (i < days) {
        // eslint-disable-next-line no-await-in-loop
        await clickElement('click', 'selector', this.nextDayButton);
        i += 1;
      }
    }
    const initialDate = new Date(gettingDateElementCurrentPage);
    const adjustedDateAsNumber :number = direction === 'back' ? initialDate.getDate() - days : initialDate.getDate() + days;
    const adjustedDate :Date = new Date(initialDate.setDate(adjustedDateAsNumber));
    const month = adjustedDate.toLocaleString('default', { month: 'long' });
    const weekday = adjustedDate.toLocaleString('default', { weekday: 'long' });
    const date = `${adjustedDate.getDate()} ${month} ${adjustedDate.getFullYear()}`;

    const dateToday = new Date();
    const currentDateString = `${dateToday.toLocaleString('default', { weekday: 'long' })} ${dateToday.getDate()} ${dateToday.toLocaleString('default', { month: 'long' })} ${dateToday.getFullYear()}`;
    const gettingDayNameElementValue = await $(getElementByReference(this.dayName)).getText();

    if (gettingDayNameElementValue === 'Today') {
      await checkEqualsText('element', this.dayName, false, 'Today');
      await checkEqualsText('element', this.dateName, false, currentDateString);
    } else {
      await checkEqualsText('element', this.dayName, false, weekday);
      await checkEqualsText('element', this.dateName, false, date);
    }
  }
}

export default new MyJournalPageObject();
