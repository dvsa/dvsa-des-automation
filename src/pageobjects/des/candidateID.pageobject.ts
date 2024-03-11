import clickElement from '@shared-boilerplate/support/action/clickElement';
import waitFor from '@shared-boilerplate/support/action/waitFor';
import Page from '../base/page';

interface CandidateIDData {
    trueLikeness: string;
}

class CandidateIDPageObject extends Page {
  private static readonly ELEMENT_REF_PREFIX: string = 'des-candidate-licence-page';

  private get trueLikenessYes() { return `${CandidateIDPageObject.ELEMENT_REF_PREFIX}::true-likeness-yes`; }

  private get trueLikenessNo() { return `${CandidateIDPageObject.ELEMENT_REF_PREFIX}::true-likeness-no`; }

  private get continueButton() { return `${CandidateIDPageObject.ELEMENT_REF_PREFIX}::continue-button`; }

  private get errorCard() { return `${CandidateIDPageObject.ELEMENT_REF_PREFIX}::error-card`; }

  private get photoCard() { return `${CandidateIDPageObject.ELEMENT_REF_PREFIX}::photo-card`; }

  private get candidateIDPageTitle() { return `${CandidateIDPageObject.ELEMENT_REF_PREFIX}::page-title`; }

  public completePage = async (data: Record<keyof CandidateIDData, string>) => {
    await waitFor(this.candidateIDPageTitle, '', false, 'be displayed');
    // Resolve after either the error card or the photo to be displayed before completing trueLikeness field.
    await Promise.race([
      waitFor(this.errorCard, '', false, 'be displayed'),
      waitFor(this.photoCard, '', false, 'be displayed'),
    ]);

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
