import clickElement from '@shared-boilerplate/support/action/clickElement';
import Page from '../base/page';

interface CandidateIDData {
    trueLikeness: string;
}

class CandidateIDPageObject extends Page {
  private static readonly ELEMENT_REF_PREFIX: string = 'des-candidate-licence-page';

  private get trueLikenessYes() { return `${CandidateIDPageObject.ELEMENT_REF_PREFIX}::true-likeness-yes`; }

  private get trueLikenessNo() { return `${CandidateIDPageObject.ELEMENT_REF_PREFIX}::true-likeness-no`; }

  private get continueButton() { return `${CandidateIDPageObject.ELEMENT_REF_PREFIX}::continue-button`; }

  public completePage = async (data: Record<keyof CandidateIDData, string>) => {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();

      switch (field) {
        case 'truelikeness':
          await clickElement(
            'click',
            'selector',
            (fieldInput === 'yes') ? this.trueLikenessYes : this.trueLikenessNo,
          );
          break;
        default:
          throw new Error(`Field unknown: ${field}`);
      }
    }
    await clickElement('click', 'selector', this.continueButton);
  }
}

export default new CandidateIDPageObject();
