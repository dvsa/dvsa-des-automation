import Page from '../base/page';

class candidateDetailsPageObject extends Page {
  public checkCandidateTestDetailsCard(data: any) {
    const {
      testCentre, candidateName, testTime, candidateReference, testCategory, examinerName,
    } = data;
    console.info('Checking candidate details card');
    expect($('.time-test-complete-text').getText()).toBe(testTime);
    expect($('.team-journal-test-centre-name').getText()).toBe(testCentre);
    expect($('.team-journal-driver-number').getText()).toBe(candidateReference);
    expect($('.candidate-name').getText()).toBe(candidateName);
    expect($('test-category').getText()).toBe(testCategory);
    expect($('.examiner-name').getText()).toBe(examinerName);
  }
}

export default new candidateDetailsPageObject();
