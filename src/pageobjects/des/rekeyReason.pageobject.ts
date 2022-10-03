import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import setInputField from '../../../shared/boilerplate/support/action/setInputField';

interface RekeyReasonPageData {
  ipadIssue: string;
  transfer: string;
  other: string;
}
class RekeyReasonPageObject extends Page {
  get ipadIssueChexbox() { return ('des-rekey-reason-page::ipadIssueCheckbox'); }

  get techFaultRadio() { return ('des-rekey-reason-page::tech-fault-radio'); }

  get lostRadio() { return ('des-rekey-reason-page::lost-radio'); }

  get otherReasonCheckbox() { return ('des-rekey-reason-page::other-reason-rekey-label'); }

  get otherReasonText() { return ('des-rekey-reason-page::reason-for-rekey-text'); }

  get transferCheckbox() { return ('des-rekey-reason-page::transfer-label'); }

  get staffNumberText() { return ('des-rekey-reason-page::staff-number-text'); }

  async completeRekeyReasonPage(
    data: Record<keyof RekeyReasonPageData, string>,
  ): Promise<void> {
    const {
      transfer, other,
    } = data;

    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();

      if (fieldInput !== 'na') {
        switch (field) {
          case 'ipad':
            await clickElement('click', 'selector', this.ipadIssueChexbox);
            await this.switchIPad(fieldInput);
            break;
          case 'transfer':
            await clickElement('click', 'selector', this.transferCheckbox);
            await setInputField('set', transfer, this.staffNumberText);
            break;
          case 'other':
            await clickElement('click', 'selector', this.otherReasonCheckbox);
            await setInputField('set', other, this.otherReasonText);
            break;
          default:
            console.log(`Could not find ${field}`);
        }
      }
    }
  }

  async switchIPad(fieldInput:string) {
    switch (fieldInput) {
      case 'tech':
        await clickElement('click', 'selector', this.techFaultRadio);
        break;
      case 'lost':
        await clickElement('click', 'selector', this.lostRadio);
        break;
      default:
        console.log(`Could not find ${fieldInput}`);
    }
  }
}

export default new RekeyReasonPageObject();
