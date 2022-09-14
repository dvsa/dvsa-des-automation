import setInputField from '@shared-boilerplate/support/action/setInputField';
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

  /**
    Completes the Declaration Page for the stated category
    All categories have the same fields, bar category ADI2 which contains one less field to select.
    @param category - Gets the name of the category that is being tested
  */
  async completeDeclartionPage(category:string): Promise<void> {
    await clickElement('click', 'selector', this.insuranceDeclarationLabel);
    if (category !== 'adi2') {
      await clickElement('click', 'selector', this.residencyDeclarationLabel);
    }
    await clickElement('click', 'selector', this.signatureAreaXpath);
    await clickElement('click', 'selector', this.declarationContinueButton);
  }

  /*
    @TODO Create one function for every category to complete the Declaration Page
    Completes the Declaration Page for a category C test
  */
  async completeCatCDeclarationPage(): Promise<void> {
    await setInputField('add', 'C123456X', this.manoeuvresPassCertNumberInput);
    await clickElement('click', 'selector', this.insuranceDeclarationLabel);
    await clickElement('click', 'selector', this.residencyDeclarationLabel);
    await clickElement('click', 'selector', this.signatureAreaXpath);
    await clickElement('click', 'selector', this.declarationContinueButton);
  }

  /*
    @TODO Move function to correct .pageobjects.ts file
    @TODO Create function to allow to choose what option for comunication. By email, by new email or by post.
    Completes the Communication Page by selecting the "By Post" option and continuing to the next page
  */
  async completeCommunicationPage(): Promise<void> {
    await clickElement('click', 'selector', this.byPostRadioButton);
    await clickElement('click', 'selector', this.comunicationContinueButton);
  }
}

export default new WaitingRoomPageObject();
