import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';

class HealthDeclarationScreenPageobject extends Page {
  get healthDeclarationLabel() { return ('des-final-pass-declaration-screen::health-declaration-label'); }

  get recievedPassCertDeclarationLabel() { return ('des-final-pass-declaration-screen::certificate-recieved-declaration-label'); }

  get signatureAreaXpath() { return ('des-final-pass-declaration-screen::signature-area-xpath'); }

  get healthDeclarationContinueButton() { return ('des-final-pass-declaration-screen::continue-btn'); }

  async completeHealthDeclarationPage(category : string): Promise<void> {
    const cat = category.toLowerCase();

    if (cat === 'manoeuvre') {
      await clickElement('click', 'selector', this.recievedPassCertDeclarationLabel);
    } else {
      await clickElement('click', 'selector', this.healthDeclarationLabel);
      await clickElement('click', 'selector', this.recievedPassCertDeclarationLabel);
    }
    await clickElement('click', 'selector', this.signatureAreaXpath);
    await clickElement('click', 'selector', this.healthDeclarationContinueButton);
  }
}

export default new HealthDeclarationScreenPageobject();
