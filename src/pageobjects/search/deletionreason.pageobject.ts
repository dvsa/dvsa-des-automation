import Page from '../base/page'

class DeletionReasonPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-deletion-reason::page-title') }

}

export default new DeletionReasonPageObject()