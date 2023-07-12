import clickElement from '@shared-boilerplate/support/action/clickElement';
import checkEqualsText from '@shared-boilerplate/support/check/checkEqualsText';
import { getElementByReference } from '@shared-helpers/element-reference-helper';
import waitFor from '@shared-boilerplate/support/action/waitFor';
import scroll from '@shared-boilerplate/support/action/scroll';
import Page from '../base/page';

class MyJournalPageObject extends Page {
  get nextDayButton() { return ('des-my-journal::next-day-btn'); }

  get previousDayButton() { return ('des-my-journal::previous-day-btn'); }

  get dayName() { return ('des-my-journal::day-name'); }

  get dateName() { return ('des-my-journal::date'); }

  get earlyStartTestModelTitle() { return ('des-my-journal::start-test-model-time-early-title'); }

  get earlyStartTestModelButton() { return ('des-my-journal::early-start-test-modal-start-test-btn'); }

  get expiredStartTestModelTitle() { return ('des-my-journal::start-test-model-time-expired-title'); }

  get expiredStartTestModelButton() { return ('des-my-journal::start-test-modal-start-test-btn'); }

  get expiredStartTestModelRekeyButton() { return ('des-my-journal::start-test-modal-rekey-test-btn'); }

  get specialReqsStartTestModelTitle() { return ('des-my-journal::start-test-model-candidate-special-reqs-title'); }

  get specialReqsStartTestModelButton() { return ('des-my-journal::start-test-modal-view-candidate-details-btn'); }

  get candidateDetailsPageTitle() { return ('des-candidate-details::page-title'); }

  get candidateDetailsBackButton() { return ('des-candidate-details::close-button'); }

  get baseStartTestId() { return ('des-candidate-app-refs::base-start-test-id'); }

  get baseActivityId() { return ('des-my-journal::base-activity-id'); }

  async changeDayCheckDate(direction:'back'|'forward', days:number): Promise<void> {
    await waitFor(this.dayName, '', false, 'be displayed');
    const gettingDateElementCurrentPage = await $(getElementByReference(this.dateName)).getText();

    let i:number = 0;
    if (direction === 'back') {
      while (i < days) {
        await clickElement('click', 'selector', this.previousDayButton);
        i += 1;
      }
    } else {
      while (i < days) {
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

  async startEarlyTest(): Promise<void> {
    await waitFor(this.earlyStartTestModelButton, '', false, 'be displayed');
    await clickElement('click', 'selector', this.earlyStartTestModelButton);
  }

  async startLateTest(): Promise<void> {
    await waitFor(this.expiredStartTestModelButton, '', false, 'be displayed');
    await clickElement('click', 'selector', this.expiredStartTestModelButton);
  }

  async startTest(appRef: string):Promise<void> {
    const startTestSelector = getElementByReference(this.baseStartTestId) + appRef;
    await scroll(startTestSelector);
    await waitFor(startTestSelector, '', false, 'be displayed');
    await clickElement('click', 'selector', startTestSelector);

    if (await $(getElementByReference(this.earlyStartTestModelTitle)).isExisting()) {
      await this.startEarlyTest();
    }

    if (await $(getElementByReference(this.expiredStartTestModelTitle)).isExisting()) {
      await this.startLateTest();
    }

    if (await $(getElementByReference(this.specialReqsStartTestModelTitle)).isExisting()) {
      await waitFor(this.specialReqsStartTestModelButton, '', false, 'be displayed');
      await clickElement('click', 'selector', this.specialReqsStartTestModelButton);
      await waitFor(this.candidateDetailsPageTitle, '', false, 'be displayed');
      await clickElement('click', 'selector', this.candidateDetailsBackButton);
      await clickElement('click', 'selector', startTestSelector);

      if (await $(getElementByReference(this.earlyStartTestModelTitle)).isExisting()) {
        await this.startEarlyTest();
      }

      if (await $(getElementByReference(this.expiredStartTestModelTitle)).isExisting()) {
        await this.startLateTest();
      }
    }
  }

  async checkActivityCode(appRef: string, expectedText: string): Promise<void> {
    const activityCodeSelector = getElementByReference(this.baseActivityId) + appRef;
    await scroll(activityCodeSelector);
    await waitFor(activityCodeSelector, '', false, 'be displayed');
    await checkEqualsText('element', activityCodeSelector, false, expectedText);
  }
}

export default new MyJournalPageObject();
