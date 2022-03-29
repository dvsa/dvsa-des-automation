import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import checkEqualsText from '../../../shared/boilerplate/support/check/checkEqualsText';
import setInputField from '../../../shared/boilerplate/support/action/setInputField';
import scroll from '../../../shared/boilerplate/support/action/scroll';

class FinalOutcomePageObject extends Page {
  get testOutcomePassed() { return ('des-final-outcome-screen::test-outcome-pass'); }

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

  checkTestOutcomeVisibility(testOutcomeText:string) {
    $(`#test-outcome-text=='${testOutcomeText}'`).waitForDisplayed();
  }

  selectTerminationReasonFromList(terminationReason:string) {
    $('ion-alert').waitForDisplayed();
    $(`.alert-radio-label=${terminationReason}`).click();
  }

  async completePassedFinalOutcomePage(data: any): Promise<void> {
    const {
      provisionalLicenceReceived, transmission, passCertNumber,
      d255, testLanguage, debriefWitnessed,
    } = data;

    await checkEqualsText('element', this.testOutcomePassed, false, 'Passed');

    if (provisionalLicenceReceived.toLowerCase() !== 'na') {
      if (provisionalLicenceReceived.toLowerCase() === 'yes') {
        await clickElement('click', 'selector', this.provLicencedRecievedYes);
      }
      if (provisionalLicenceReceived.toLowerCase() === 'no') {
        await clickElement('click', 'selector', this.provLicencedRecievedNo);
      }
    }

    if (transmission.toLowerCase() !== 'na') {
      if (transmission.toLowerCase() === 'manual') {
        await clickElement('click', 'selector', this.transmissionManualInput);
      }
      if (transmission.toLowerCase() === 'automatic') {
        await clickElement('click', 'selector', this.transmissionAutomaticInput);
      }
    }

    if (passCertNumber.toLowerCase() !== 'na') {
      await setInputField('add', passCertNumber, this.passCertificateNumberInput);
    }

    await scroll(this.d255YesInput);

    if (d255.toLowerCase() !== 'na') {
      if (d255.toLowerCase() === 'yes') {
        await clickElement('click', 'selector', this.d255YesInput);
      }
      if (d255.toLowerCase() === 'no') {
        await clickElement('click', 'selector', this.d255NoInput);
      }
    }

    await scroll(this.languageEnglishInput);

    if (testLanguage.toLowerCase() !== 'na') {
      if (testLanguage.toLowerCase() === 'english') {
        await clickElement('click', 'selector', this.languageEnglishInput);
      }
      if (testLanguage.toLowerCase() === 'cymraeg') {
        await clickElement('click', 'selector', this.languageCymraegInput);
      }
    }

    await scroll(this.debriefWitnessedYes);

    if (debriefWitnessed.toLowerCase() !== 'na') {
      if (debriefWitnessed.toLowerCase() === 'yes') {
        await clickElement('click', 'selector', this.debriefWitnessedYes);
      }
      if (debriefWitnessed.toLowerCase() === 'no') {
        await clickElement('click', 'selector', this.debriefWitnessedNo);
      }
    }

    await clickElement('click', 'selector', this.passFinalisationContinueButton);
  }
}

export default new FinalOutcomePageObject();
