import Page from '../base/page'

class SearchAndCopyEncounterListPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-search-and-copy-encounter-list::page-title') }

}

export default new SearchAndCopyEncounterListPageObject()