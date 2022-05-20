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

  get eyeSightFailLabel() { return ('des-waiting-room-to-car::eyesight-fail-label'); }

  get continueToDebriefButton() { return ('des-waiting-room-to-car::continue-to-debrief-btn'); }

  get catCVehicleChecks() { return ('des-waiting-room-to-car::vehicle-check-select-questions-btn'); }

  get vehicleChecksOne() { return ('des-waiting-room-to-car::vehicle-checks-question-selector-one'); }

  get vehicleChecksTwo() { return ('des-waiting-room-to-car::vehicle-checks-question-selector-two'); }

  get vehicleChecksThree() { return ('des-waiting-room-to-car::vehicle-checks-question-selector-three'); }

  get vehicleChecksFour() { return ('des-waiting-room-to-car::vehicle-checks-question-selector-four'); }

  get vehicleChecksFive() { return ('des-waiting-room-to-car::vehicle-checks-question-selector-five'); }

  get vehicleChecksCorrectOne() { return ('des-waiting-room-to-car::vehicleChecksCorrectOne'); }

  get vehicleChecksCorrectTwo() { return ('des-waiting-room-to-car::vehicleChecksCorrectTwo'); }

  get vehicleChecksCorrectThree() { return ('des-waiting-room-to-car::vehicleChecksCorrectThree'); }

  get vehicleChecksCorrectFour() { return ('des-waiting-room-to-car::vehicleChecksCorrectFour'); }

  get vehicleChecksCorrectFive() { return ('des-waiting-room-to-car::vehicleChecksCorrectFive'); }

  get submitVehicleChecks() { return ('des-waiting-room-to-car::submit-vehicle-checks'); }

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

  async completeCatCWRTCPage(): Promise<void> {
    await setInputField('add', 'vehreg', this.vehRegInput);

    await clickElement('click', 'selector', this.catCVehicleChecks);
    await clickElement('click', 'selector', this.vehicleChecksOne);
    await clickElementWithText('click', 'button', 'Q2 - Air leaks');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.vehicleChecksCorrectOne);

    await clickElement('click', 'selector', this.vehicleChecksTwo);
    await clickElementWithText('click', 'button', 'Q6 - Mudguards condition');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.vehicleChecksCorrectTwo);

    await clickElement('click', 'selector', this.vehicleChecksThree);
    await clickElementWithText('click', 'button', 'Q15 - Brake lights');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.vehicleChecksCorrectThree);

    await clickElement('click', 'selector', this.vehicleChecksFour);
    await clickElementWithText('click', 'button', 'Q9 - Body safety');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.vehicleChecksCorrectFour);

    await clickElement('click', 'selector', this.vehicleChecksFive);
    await clickElementWithText('click', 'button', 'Q16 - Engine coolant');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.vehicleChecksCorrectFive);

    await clickElement('click', 'selector', this.submitVehicleChecks);
    await clickElement('click', 'selector', this.continueToTestReportButton);
  }

  async completeWRTCPageForFailEyesight(): Promise<void> {
    await clickElement('click', 'selector', this.eyeSightFailLabel);
    await clickElement('click', 'selector', this.continueToDebriefButton);
  }
}

export default new WaitingRoomPageToCarObject();
