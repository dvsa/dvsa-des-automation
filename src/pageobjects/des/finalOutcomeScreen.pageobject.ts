/* eslint-disable no-restricted-syntax */
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

  async completePassedFinalOutcomePage(
    data: Record<keyof PassedFinalOutcomeData, string>,
  ): Promise<void> {
    const { passCertNumber } = data;
    await checkEqualsText('element', this.testOutcomePassed, false, 'Passed');

    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'provisionallicencereceived':
            switch (fieldInput) {
              case 'yes':
                await clickElement('click', 'selector', this.provLicencedRecievedYes);
                break;
              case 'no':
                await clickElement('click', 'selector', this.provLicencedRecievedNo);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          case 'transmission':
            switch (fieldInput) {
              case 'manual':
                await clickElement('click', 'selector', this.transmissionManualInput);
                break;
              case 'automatic':
                await clickElement('click', 'selector', this.transmissionAutomaticInput);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          case 'passcertnumber':
            await setInputField('add', passCertNumber, this.passCertificateNumberInput);
            break;
          case 'd255':
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
            break;
          case 'testlanguage':
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
            break;
          case 'debriefwitnessed':
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
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
    await clickElement('click', 'selector', this.passFinalisationContinueButton);
  }

  async completeNonPassedFinalOutcomePage(
    testOutcome:string,
    data: Record<keyof NonPassedFinalOutcomeData, string>,
  ): Promise<void> {
    const { activityCode } = data;

    // if (testOutcome === 'unsuccessful') {
    //   await checkEqualsText('element', this.testOutcomeFailed, true, 'Failed');
    // } else if (testOutcome === 'terminated') {
    //   await checkEqualsText('element', this.testOutcomeTerminated, false, 'Terminated');
    // }

    await this.checkFinaliseOutcomeTestOutcome(testOutcome);

    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'activitycode':
            console.info('activityCode:    ', activityCode);
            await clickElement('click', 'selector', this.activityCodeSelector);
            await clickElement('click', 'selector', activityCode);
            if (activityCode === 'des-final-outcome-screen::activity-code-4' || activityCode === 'des-final-outcome-screen::activity-code-5') {
              await this.checkFinaliseOutcomeTestOutcome('unsuccessful');
            }
            break;
          case 'd255':
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
            break;
          case 'testlanguage':
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
            break;
          case 'debriefwitnessed':
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
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
    await clickElement('click', 'selector', this.failFinalisationContinueButton);
  }

  async checkFinaliseOutcomeTestOutcome(outcome:string): Promise<void> {
    if (outcome === 'unsuccessful') {
      await checkEqualsText('element', this.testOutcomeFailed, true, 'Failed');
    } else if (outcome === 'terminated') {
      await checkEqualsText('element', this.testOutcomeTerminated, false, 'Terminated');
    }
  }
}

export default new FinalOutcomePageObject();
