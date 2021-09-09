import Page from '../base/page'

class FinalOutcomePageObject extends Page {

checkTestOutcomeVisibility(testOutcomeText:string) {
    $(`#test-outcome-text=='${testOutcomeText}'`).waitForDisplayed()
}

selectTerminationReasonFromList(terminationReason:string){
    $('ion-alert').waitForDisplayed()
    $(`.alert-radio-label=${terminationReason}`).click()
}
   
}

export default new FinalOutcomePageObject()
