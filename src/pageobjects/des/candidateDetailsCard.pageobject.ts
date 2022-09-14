import checkEqualsText from '@shared-boilerplate/support/check/checkEqualsText';
import Page from '../base/page';

class CandidateDetailsPageObject extends Page {
  /**
    checks the candidate details card to see if they match the given values
    @param data - gets data from a data table in the feature file
  */
  public async checkCandidateTestDetailsCard(data: any) {
    const {
      testCentre, candidateName, testTime, candidateReference, testCategory, examinerName,
    } = data;
    console.info('Checking candidate details card');

    await checkEqualsText('element', '<test-category />', false, testCategory);
    await checkEqualsText('element', '.time-test-complete-text', false, testTime);
    await checkEqualsText('element', '.team-journal-test-centre-name', false, testCentre);
    await checkEqualsText('element', '.team-journal-driver-number', false, candidateReference);
    await checkEqualsText('element', '.candidate-name', false, candidateName);
    await checkEqualsText('element', '.examiner-name', false, examinerName);
  }
}

export default new CandidateDetailsPageObject();
