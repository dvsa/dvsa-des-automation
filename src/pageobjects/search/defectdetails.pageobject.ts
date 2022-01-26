import Page from '../base/page'

class DefectDetailsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-defect-details::page-title') }

}

export default new DefectDetailsPageObject()