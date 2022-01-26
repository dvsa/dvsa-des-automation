import Page from '../base/page'

class AdditionalTextPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-additional-text::page-title') }

}

export default new AdditionalTextPageObject()