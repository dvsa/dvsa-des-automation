import Page from '../base/page'

class SignificantReasonPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-significant-reason::page-title') }

}

export default new SignificantReasonPageObject()