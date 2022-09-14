import checkEqualsText from '@shared-boilerplate/support/check/checkEqualsText';
import Page from '../base/page';

interface CheckFaultData {
  faultSelector: string,
  faultExpectedText:string
  faultCountSelector: string,
  numberOfFaults: string
}

class DebriefScreenPageObject extends Page {
  /**
    Checks the faults on the debrief page to see if they match the given values
    @param data - gets data from a data table in the feature file
  */
  async checkCorrectFaults(
    data: Record<keyof CheckFaultData, string>[],
  ): Promise<void> {
    const [{
      faultSelector,
      faultExpectedText,
      faultCountSelector,
      numberOfFaults,
    }] = data;

    for (let i = 0; i < data.length; i += 1) {
      await checkEqualsText('element', faultSelector, false, faultExpectedText);
      await checkEqualsText('element', faultCountSelector, false, numberOfFaults);
    }
  }
}

export default new DebriefScreenPageObject();
