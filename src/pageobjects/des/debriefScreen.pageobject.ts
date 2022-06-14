import checkEqualsText from '@shared-boilerplate/support/check/checkEqualsText';
import Page from '../base/page';

interface CheckFaultData {
  faultSelector: string,
  faultExpectedText:string
  faultCountSelector: string,
  numberOfFaults: string
}

class DebriefScreenPageObject extends Page {
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
      const faultName = faultSelector;
      const expectedText = faultExpectedText;
      const faultCount = faultCountSelector;
      const faultNumber = numberOfFaults;
      await checkEqualsText('element', faultName, false, expectedText);
      await checkEqualsText('element', faultCount, false, faultNumber);
    }
  }
}

export default new DebriefScreenPageObject();
