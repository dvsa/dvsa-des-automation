import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import clickElementWithText from '../../../shared/custom/support/action/clickElementWithText';
import setInputField from '../../../shared/boilerplate/support/action/setInputField';
import Page from '../base/page';

class WaitingRoomPageToCarObject extends Page {
  get eyeSightPassLabel() { return ('des-waiting-room-to-car::eyesight-pass-label'); }

  get tellMeSeclector() { return ('des-waiting-room-to-car::tell-me-selector'); }

  get tellMeAnswerCorrectLabel() { return ('des-waiting-room-to-car::tell-me-answer-correct-label'); }

  get vehRegInput() { return ('des-waiting-room-to-car::vehicle-registration-input-input'); }

  get manualTransmissionLabel() { return ('des-waiting-room-to-car::manual-transmission-label'); }

  get continueToTestReportButton() { return ('des-waiting-room-to-car::continue-to-test-report-btn'); }

  async completeWRTCPage(): Promise<void> {
    await clickElement('click', 'selector', this.eyeSightPassLabel);
    await clickElement('click', 'selector', this.tellMeSeclector);
    await clickElementWithText('click', 'button', 'T1 - Brakes');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.tellMeAnswerCorrectLabel);
    await setInputField('add', 'vehreg', this.vehRegInput);
    await clickElement('click', 'selector', this.manualTransmissionLabel);
    await clickElement('click', 'selector', this.continueToTestReportButton);
  }
}

export default new WaitingRoomPageToCarObject();
