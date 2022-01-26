import clickElement from '../../support/common/action/clickElement';
import clickElementWithText from '../../support/common/action/clickElementWithText';
import setInputField from '../../support/common/action/setInputField';
import Page from '../base/page'

class AddNoticesPagePageObject extends Page {

    get noticesPageClick() { return 'smc-notices::notice-page-click' }
    get pageTitle() { return this.getSelector('smc-notices::page-title') }
    get addOverweightNotice() { return 'smc-notices::overwieght-notice-add-button' }
    get addDynamicNotice() { return 'smc-notices::dynamic-weights-notice-add-button' }
    get reviewAndPrintButton() { return 'smc-notices::review-print-button' }
    get receivedFirstName() { return 'smc-notices::notice-received-first-name' }
    get receivedLastName() { return 'smc-notices::notice-received-last-name' }
    get saveNotice() { return 'smc-notices::save-notice' }
    get NoticeDetail() { return '#driverDetailsDateOfBirthPicker' }


    addNoticeByName(noticeName: any, dataTable: any) {
        console.info(`waiting to adding notice : ${noticeName}`)
        const data = dataTable.rowsHash();
        $(`.item-inner*=${noticeName}`).waitForDisplayed()
        browser.pause(500)
        $(`.item-inner*=${noticeName}`).$('button=Add').click()

        if ($('#noticeTachoInspectionDueInput').isDisplayed() === true) {
            clickElement('click', 'selector', '#noticeTachoInspectionDueInput button');
            clickElementWithText('click', 'button', 'Done')
        }
        console.info('filling in notice details')
        this.fillNoticeDetails(data)
        clickElementWithText('click', 'button', 'Add Notice to Encounter')
    }

    fillNoticeDetails(data: any) {
        const { firstName, lastName } = data;

        let firstNameCurrent = $('#noticeReceivedByFirstNameInput input').getText();
        let lastNameCurrent = $('#noticeReceivedByLastNameInput input').getText();


        console.log(firstNameCurrent,lastNameCurrent)

        if ( firstNameCurrent.length === 0 ){
            clickElement('click', 'selector', '#noticeReceivedByFirstNameInput input');
            setInputField('set', firstName, '#noticeReceivedByFirstNameInput input');
        }

        if ( lastNameCurrent.length === 0 ){
            clickElement('click', 'selector', '#noticeReceivedByLastNameInput input');
            setInputField('set', lastName, '#noticeReceivedByLastNameInput input');
        }

    }

}

export default new AddNoticesPagePageObject()