import Page from '../base/page'

class FinalOutcomePageObject extends Page {

checkTestOutcomeVisibility(testOutcomeText:string) {
    $(`#test-outcome-text=='${testOutcomeText}'`).waitForDisplayed()
}
   
}

export default new FinalOutcomePageObject()
