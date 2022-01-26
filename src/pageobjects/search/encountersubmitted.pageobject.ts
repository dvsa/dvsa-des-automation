import Page from '../base/page'

class EncounterSubmittedPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-encounter-submitted::page-title') }
    
}

export default new EncounterSubmittedPageObject()