import Page from '../base/page'
import clickElement from '../../support/common/action/clickElement'
import clickElementWithText from '../../support/common/action/clickElementWithText'
import setInputField from '../../support/common/action/setInputField'

class EncounterSearchPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-encounter-search::page-title') };
    get vrmField() { return 'smc-encounter-search::vrm' };
    get examinerDropButton() { return 'smc-encounter-search::examiner' };

    openEncounterFromBurgerMenu() {
        $('#menuButton').waitForDisplayed()
        $('#menuButton').click()
    }

    public fillEncounterSearchDetails(data: any) {
        const { vrm, examiner } = data;

        console.info('Filling in encounter search details');

        if (vrm !== 'NA') {
            clickElement('click', 'selector', '#vehicleIdValue');
            browser.pause(1000)
            setInputField('set', vrm, this.vrmField)
        };

        if (examiner !== 'NA') {
            clickElement('click', 'selector', this.examinerDropButton);
            clickElementWithText('click', 'ionic-list-button', examiner);
            clickElementWithText('click', 'button', "OK");
        }

    }

}

export default new EncounterSearchPageObject()