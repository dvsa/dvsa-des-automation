import clickElement from '@shared-boilerplate/support/action/clickElement';
import checkEqualsText from '@shared-boilerplate/support/check/checkEqualsText';
import Page from '../base/page';

class MyJournalPageObject extends Page {
  get nextDayButton() { return ('des-my-journal::next-day-btn'); }

  get previousDayButton() { return ('des-my-journal::previous-day-btn'); }

  get dayName() { return ('des-my-journal::day-name'); }

  get dateName() { return ('des-my-journal::date'); }

  async changeDayCheckDate(direction:'back'|'forward', days:number): Promise<void> {
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

    const currentDate = new Date();
    const adjustedDateAsNumber :number = direction === 'back' ? currentDate.getDate() - days : currentDate.getDate() + days;
    const adjustedDate :Date = new Date(currentDate.setDate(adjustedDateAsNumber));
    const month = adjustedDate.toLocaleString('default', { month: 'long' });
    const weekday = adjustedDate.toLocaleString('default', { weekday: 'long' });

    const date = `${adjustedDate.getDate()} ${month} ${adjustedDate.getFullYear()}`;
    const todayDate = `${weekday} ${adjustedDate.getDate()} ${month} ${adjustedDate.getFullYear()}`;

    console.info('weekday:', weekday);
    console.info('months:', month);
    console.info('date: ', date);
    console.info('today date:', todayDate);

    if (days === 0) {
      await checkEqualsText('element', this.dayName, false, 'Today');
      await checkEqualsText('element', this.dateName, false, todayDate);
    } else {
      await checkEqualsText('element', this.dayName, false, weekday);
      await checkEqualsText('element', this.dateName, false, date);
    }
  }
}

export default new MyJournalPageObject();
