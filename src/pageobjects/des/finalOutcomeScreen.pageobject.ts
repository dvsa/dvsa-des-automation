import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import checkEqualsText from '../../../shared/boilerplate/support/check/checkEqualsText';
import setInputField from '../../../shared/boilerplate/support/action/setInputField';
import scroll from '../../../shared/boilerplate/support/action/scroll';

interface PassedFinalOutcomeData {
  passCertNumber: string;
}

interface NonPassedFinalOutcomeData {
  activityCode: string;
}

class FinalOutcomePageObject extends Page {
  get testOutcomePassed() { return ('des-final-outcome-screen::test-outcome-pass'); }

  get testOutcomeFailed() { return ('des-final-outcome-screen::test-outcome-failed'); }

  get testOutcomeTerminated() { return ('des-final-outcome-screen::test-outcome-terminated'); }

  get provLicencedRecievedYes() { return ('des-final-outcome-screen::provisional-license-recieved-option-yes'); }

  get provLicencedRecievedNo() { return ('des-final-outcome-screen::provisional-license-recieved-option-no'); }

  get transmissionManualInput() { return ('des-final-outcome-screen::transmission-manual-input'); }

  get transmissionManualInputCatC() { return ('des-final-outcome-screen::transmission-manual-label'); }

  get transmissionAutomaticInput() { return ('des-final-outcome-screen::transmission-automatic-input'); }

  get passCertificateNumberInput() { return ('des-final-outcome-screen::pass-certificate-number-field-input'); }

  get d255YesInput() { return ('des-final-outcome-screen::d255-yes-input'); }

  get d255NoInput() { return ('des-final-outcome-screen::d255-no-input'); }

  get languageEnglishInput() { return ('des-final-outcome-screen::lang-pref-english-input'); }

  get languageCymraegInput() { return ('des-final-outcome-screen::lang-pref-cymraeg-input'); }

  get debriefWitnessedYes() { return ('des-final-outcome-screen::debrief-witness-yes-input'); }

  get debriefWitnessedNo() { return ('des-final-outcome-screen::debrief-witness-no-input'); }

  get passFinalisationContinueButton() { return ('des-final-outcome-screen::continue-btn'); }

  get failFinalisationContinueButton() { return ('des-final-outcome-screen::fail-continue-btn'); }

  get activityCodeSelector() { return ('des-final-outcome-screen::activity-code-selector-xpath'); }

  get code78() { return ('des-final-outcome-screen::code-78-not-received'); }

  get licenceReceivedYesLabel() { return ('des-final-outcome-screen::licence-received-yes-label'); }

  get licenceReceivedNoLabel() { return ('des-final-outcome-screen::licence-received-no-label'); }

  async completePassedFinalOutcomePage(
    data: Record<keyof PassedFinalOutcomeData, string>,
  ): Promise<void> {
    const { passCertNumber } = data;
    await this.checkFinaliseOutcomeTestOutcome('passed');

    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'code78':
            await clickElement('click', 'selector', this.code78);
            break;
          case 'provisionallicencereceived':
            await clickElement(
              'click',
              'selector',
              fieldInput === 'yes' ? this.provLicencedRecievedYes : this.provLicencedRecievedNo,
            );
            break;
          case 'transmission':
            await this.switchClickTransmission(fieldInput);
            break;
          case 'passcertnumber':
            await setInputField('add', passCertNumber, this.passCertificateNumberInput);
            break;
          case 'd255':
            await this.switchD255(fieldInput);
            break;
          case 'testlanguage':
            await this.switchTestLanguage(fieldInput);
            break;
          case 'debriefwitnessed':
            await this.switchDebriefWitnessed(fieldInput);
            break;
          case 'licencereceived':
            await this.switchLicenceReceived(fieldInput);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
    await clickElement('click', 'selector', this.passFinalisationContinueButton);
  }

  async completeNonPassedFinalOutcomePage(
    testOutcome:'unsuccessful' | 'terminated',
    data: Record<keyof NonPassedFinalOutcomeData, string>,
  ): Promise<void> {
    const { activityCode } = data;

    await this.checkFinaliseOutcomeTestOutcome(testOutcome);

    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'activitycode':
            await clickElement('click', 'selector', this.activityCodeSelector);
            await clickElement('click', 'selector', activityCode);
            if (activityCode === 'des-final-outcome-screen::activity-code-4' || activityCode === 'des-final-outcome-screen::activity-code-5') {
              await this.checkFinaliseOutcomeTestOutcome('unsuccessful');
            }
            break;
          case 'd255':
            await this.switchD255(fieldInput);
            break;
          case 'testlanguage':
            await this.switchTestLanguage(fieldInput);
            break;
          case 'debriefwitnessed':
            await this.switchDebriefWitnessed(fieldInput);
            await scroll(this.debriefWitnessedYes);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
    await clickElement('click', 'selector', this.failFinalisationContinueButton);
  }

  async checkFinaliseOutcomeTestOutcome(outcome: 'passed' | 'unsuccessful' | 'terminated'): Promise<void> {
    switch (outcome) {
      case 'passed':
        await checkEqualsText('element', this.testOutcomePassed, false, 'Passed');
        break;
      case 'unsuccessful':
        await checkEqualsText('element', this.testOutcomeFailed, true, 'Failed');
        break;
      case 'terminated':
        await checkEqualsText('element', this.testOutcomeTerminated, false, 'Terminated');
        break;
      default:
        console.info(`${outcome} is not a test outcome, or ${outcome} could not be found`);
    }
  }

  async switchClickTransmission(fieldInput:string) {
    switch (fieldInput) {
      case 'manual':
        await clickElement('click', 'selector', this.transmissionManualInput);
        break;
      case 'automatic':
        await clickElement('click', 'selector', this.transmissionAutomaticInput);
        break;
      case 'manualcatc':
        await clickElement('click', 'selector', this.transmissionManualInputCatC);
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }

  async switchD255(fieldInput:string) {
    await scroll(this.d255YesInput);
    switch (fieldInput) {
      case 'yes':
        await clickElement('click', 'selector', this.d255YesInput);
        break;
      case 'no':
        await clickElement('click', 'selector', this.d255NoInput);
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }

  async switchTestLanguage(fieldInput:string) {
    await scroll(this.languageEnglishInput);
    switch (fieldInput) {
      case 'english':
        await clickElement('click', 'selector', this.languageEnglishInput);
        break;
      case 'cymraeg':
        await clickElement('click', 'selector', this.languageCymraegInput);
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }

  async switchDebriefWitnessed(fieldInput:string) {
    await scroll(this.debriefWitnessedYes);
    switch (fieldInput) {
      case 'yes':
        await clickElement('click', 'selector', this.debriefWitnessedYes);
        break;
      case 'no':
        await clickElement('click', 'selector', this.debriefWitnessedNo);
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }

  async switchLicenceReceived(fieldInput:string) {
    await scroll(this.licenceReceivedYesLabel);
    switch (fieldInput) {
      case 'yes':
        await clickElement('click', 'selector', this.licenceReceivedYesLabel);
        break;
      case 'no':
        await clickElement('click', 'selector', this.licenceReceivedNoLabel);
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }
}

export default new FinalOutcomePageObject();
