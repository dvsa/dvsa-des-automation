import Page from '../base/page'

class CloseProhibitionsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-close-prohibitions::page-title') }

}

export default new CloseProhibitionsPageObject()