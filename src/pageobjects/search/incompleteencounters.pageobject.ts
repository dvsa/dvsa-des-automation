import Page from '../base/page'

class ImcompleteEncountersPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-incomplete-encounters::page-title') }

}

export default new ImcompleteEncountersPageObject()