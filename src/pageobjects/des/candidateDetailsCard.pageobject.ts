import Page from '../base/page'

class candidateDetailsPageObject extends Page {
    public checkCandidateTestDetailsCard(data: any) {
        const { testCentre, candidateName, testTime, candidateReference, testCategory, examinerName } = data;
        console.info('Checking candidate details card');
        console.info('>>>>>>>>>',testCentre, candidateName, testTime, candidateReference, testCategory, examinerName);
        expect($(".time-test-complete-text").getText()).toBe(testTime)
        expect($(".team-journal-test-centre-name").getText()).toBe(testCentre)
        expect($(".team-journal-driver-number").getText()).toBe(candidateReference)
        expect($(".candidate-name").getText()).toBe(candidateName)
        expect($("test-category").getText()).toBe(testCategory)
        expect($(".examiner-name").getText()).toBe(examinerName)


        // clickElement('click', 'selector', this.journeyType);
        // clickElementWithText('click', 'element', type);

        // /***
        // * journey start location
        // journey end location 
        // journey goods carried
        // */

        // setInputField('set', startLocation, this.journeyStartLocation);
        // setInputField('set', endLocation, this.journeyEndLocation);
        // setInputField('set', goodsCarried, this.journeyGoodsCarried);
    }
   
}

export default new candidateDetailsPageObject()
