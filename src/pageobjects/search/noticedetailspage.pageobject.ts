import Page from '../base/page'

class NoticeDetailsPagePageObject extends Page {

    get pageTitle() { return this.getSelector('smc-notice-details-page::page-title') }

}

export default new NoticeDetailsPagePageObject()