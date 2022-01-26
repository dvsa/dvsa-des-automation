import clickElementWithText from '../../support/common/action/clickElementWithText';
import Page from '../base/page'

class PrintNoticesPageObject extends Page {

    reviewAndPrintNotices() {
        console.info('Review and Print notices')
        clickElementWithText('click', 'button', "Review & Print Notices");
        clickElementWithText('click', 'button', "Continue Encounter");
        clickElementWithText('click', 'button', "Leave");
    }
}

export default new PrintNoticesPageObject()