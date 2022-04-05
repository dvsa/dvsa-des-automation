import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';

class WaitingRoomPageObject extends Page {
  get insuranceDeclarationLabel() { return ('des-exam-waiting-room::insurance-declaration-label'); }

  get residencyDeclarationLabel() { return ('des-exam-waiting-room::residency-declaration-label'); }

  get signatureAreaXpath() { return ('des-exam-waiting-room::signature-area-xpath'); }

  get declarationContinueButton() { return ('des-general::continue-btn'); }

  get comunicationContinueButton() { return ('des-comms-screen::continue-btn'); }

  get byPostRadioButton() { return ('des-comms-screen::by-post-radio-btn'); }

  async completeDeclartionPage(): Promise<void> {
    await clickElement('click', 'selector', this.insuranceDeclarationLabel);
    await clickElement('click', 'selector', this.residencyDeclarationLabel);
    await clickElement('click', 'selector', this.signatureAreaXpath);
    await clickElement('click', 'selector', this.declarationContinueButton);
  }

  async completeCommunicationPage(): Promise<void> {
    await clickElement('click', 'selector', this.byPostRadioButton);
    await clickElement('click', 'selector', this.comunicationContinueButton);
  }
}

export default new WaitingRoomPageObject();
