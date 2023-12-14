import setInputField from '@shared-boilerplate/support/action/setInputField';
import waitFor from '@shared-boilerplate/support/action/waitFor';
import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';

class WaitingRoomPageObject extends Page {
  get insuranceDeclarationLabel() { return ('des-exam-waiting-room::insurance-declaration-label'); }

  get residencyDeclarationLabel() { return ('des-exam-waiting-room::residency-declaration-label'); }

  get signatureAreaXpath() { return ('des-exam-waiting-room::signature-area-xpath'); }

  get declarationContinueButton() { return ('des-general::continue-btn'); }

  get comunicationContinueButton() { return ('des-comms-screen::continue-btn'); }

  get byPostRadioButton() { return ('des-comms-screen::by-post-radio-btn'); }

  get manoeuvresPassCertNumberInput() { return ('des-final-outcome-screen::manoeuvres-pass-cert-number'); }

  async completeDeclartionPage(category:string): Promise<void> {
    await waitFor(this.insuranceDeclarationLabel, '', false, 'be clickable');
    await clickElement('click', 'selector', this.insuranceDeclarationLabel);
    if (!(category === 'adi2' || category === 'adi3')) {
      await clickElement('click', 'selector', this.residencyDeclarationLabel);
    }
    await this.tapElement(this.signatureAreaXpath);
    await clickElement('click', 'selector', this.declarationContinueButton);
  }

  async completeCatCDeclarationPage(): Promise<void> {
    await setInputField('add', 'C123456X', this.manoeuvresPassCertNumberInput);
    await clickElement('click', 'selector', this.insuranceDeclarationLabel);
    await clickElement('click', 'selector', this.residencyDeclarationLabel);
    await this.tapElement(this.signatureAreaXpath);
    await clickElement('click', 'selector', this.declarationContinueButton);
  }

  async completeCommunicationPage(): Promise<void> {
    await clickElement('click', 'selector', this.byPostRadioButton);
    await clickElement('click', 'selector', this.comunicationContinueButton);
  }
}

export default new WaitingRoomPageObject();
