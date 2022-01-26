import Page from '../base/page'

class SearchAndCopyEncounterPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-search-and-copy-encounter::page-title') }

}

export default new SearchAndCopyEncounterPageObject()