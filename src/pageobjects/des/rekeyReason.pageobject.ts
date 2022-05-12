import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import setInputField from '../../../shared/boilerplate/support/action/setInputField';

interface OfficePageData {
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
    data: Record<keyof OfficePageData, string>,
  ): Promise<void> {
    const {
      transfer, other,
    } = data;

    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();

      console.log('WOW: ', field, fieldInput);

      if (fieldInput !== 'na') {
        switch (field) {
          case 'ipad':
            console.log('Tick Ipad');
            await clickElement('click', 'selector', this.ipadIssueChexbox);
            switch (fieldInput) {
              case 'tech':
                console.log('Tick tech');
                await clickElement('click', 'selector', this.techFaultRadio);
                break;
              case 'lost':
                console.log('Tick lost');
                await clickElement('click', 'selector', this.lostRadio);
                break;
              default:
                console.log(`Could not find ${fieldInput}`);
            }
            break;
          case 'transfer':
            console.log('Ticking transfer');
            await clickElement('click', 'selector', this.transferCheckbox);
            console.log('Typing transfer');
            await setInputField('set', transfer, this.staffNumberText);
            break;
          case 'other':
            console.log('Ticking other');
            await clickElement('click', 'selector', this.otherReasonCheckbox);
            console.log('Typing other');
            await setInputField('set', other, this.otherReasonText);
            break;
          default:
            console.log(`Could not find ${field}`);
        }
      }
    }
  }
}

export default new RekeyReasonPageObject();
