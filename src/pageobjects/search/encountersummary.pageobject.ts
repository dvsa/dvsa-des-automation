import Page from '../base/page'

class EncounterSummaryPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-encounter-summary::page-title') }
    
}

export default new EncounterSummaryPageObject()