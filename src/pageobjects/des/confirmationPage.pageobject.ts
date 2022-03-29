import Page from '../base/page';
import checkEqualsText from '../../../shared/boilerplate/support/check/checkEqualsText';

class ConfirmationPageObject extends Page {
  get testOutcomeValue() { return ('des-final-confirmation-screen::test-outcome-value'); }

  get activityCodeValue() { return ('des-final-confirmation-screen::test-activity-code-value'); }

  get testCategoryValue() { return ('des-final-confirmation-screen::test-cat-value'); }

  get provisionalLicencedValue() { return ('des-final-confirmation-screen::test-prov-licence-value'); }

  get transmissionValue() { return ('des-final-confirmation-screen::test-transmission-value'); }

  get d255Value() { return ('des-final-confirmation-screen::test-d255-value'); }

  async checkPassedConfirmationPageDetails(data: any): Promise<void> {
    const {
      testOutcome, activityCode, testCategory, provLicenceRecieved, transmission, d255,
    } = data;

    await checkEqualsText('element', this.testOutcomeValue, false, testOutcome);
    await checkEqualsText('element', this.activityCodeValue, false, activityCode);
    await checkEqualsText('element', this.testCategoryValue, false, testCategory);
    await checkEqualsText('element', this.provisionalLicencedValue, false, provLicenceRecieved);
    await checkEqualsText('element', this.transmissionValue, false, transmission);
    await checkEqualsText('element', this.d255Value, false, d255);
  }
}

export default new ConfirmationPageObject();
