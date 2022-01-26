import Page from '../base/page'

class SearchCopySearchNoticesPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-search-and-copy-search-notices::page-title') }

}

export default new SearchCopySearchNoticesPageObject()
