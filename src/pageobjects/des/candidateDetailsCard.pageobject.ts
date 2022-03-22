import checkEqualsText from '@shared-boilerplate/support/check/checkEqualsText';
import Page from '../base/page';

class CandidateDetailsPageObject extends Page {
  public async checkCandidateTestDetailsCard(data: any) {
    const {
      testCentre, candidateName, testTime, candidateReference, testCategory, examinerName,
    } = data;
    console.info('Checking candidate details card');

    // await checkEqualsText('element', '.test-category', false, testCategory);
    await checkEqualsText('element', '.time-test-complete-text', false, testTime);
    await checkEqualsText('element', '.team-journal-test-centre-name', false, testCentre);
    await checkEqualsText('element', '.team-journal-driver-number', false, candidateReference);
    await checkEqualsText('element', '.candidate-name', false, candidateName);
    await checkEqualsText('element', '.examiner-name', false, examinerName);
  }
}

export default new CandidateDetailsPageObject();
