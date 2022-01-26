import Page from '../base/page'
import clickElementWithText from '../../support/common/action/clickElementWithText'

class DriverSearchPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-driver-search::page-title') }
   
    async clickOKNoResultsModal() {
            clickElementWithText('click', 'button', 'OK');
    }

}

export default new DriverSearchPageObject()