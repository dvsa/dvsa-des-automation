import clickElement from '../../support/common/action/clickElement';
import clickElementWithText from '../../support/common/action/clickElementWithText';
import setInputField from '../../support/common/action/setInputField';
import ionicSetIonic3DateField from '../../support/ionic/ionic-action/ionic-setIonic3DateField';
import Page from '../base/page'

class DriverDetailsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-trailer-details::page-title') }
    get ethnicityDropDown() { return ('smc-driver-details::ethnicity-drop-button') }
    get firstName() { return ('smc-driver-details::first-name') }
    get lastName() { return ('smc-driver-details::last-name') }
    get ukResidentButton() { return ('smc-driver-details::uk-resident-button') }
    get addressField1() { return ('smc-driver-details::address-line1') }

    get postTownField() { return ('smc-driver-details::post-town') }

    get issuingNationDropDown() { return ('smc-driver-details::issuing-nation-button') }
    get drivingLicenceNumberField() { return ('smc-driver-details::driving-licence') }
    get drivingSaveData() { return ('smc-driver-details::save-data-button') }


    public fillDriverDetailsFromDataTable(data: any) {
        const { ethnicity, firstName, lastName, resident, Address1, postTown, issuingNation, drivingLicenceNumber } = data;

        console.info('Filling in mandatory Driver 1 details');
        //ethnicity drop down
        clickElement('click', 'selector', this.ethnicityDropDown);
        clickElementWithText('click', 'element', ethnicity);

        //first name and last name fields
        setInputField('set', firstName, this.firstName);
        clickElement('click', 'selector', this.lastName);
        setInputField('set', lastName, this.lastName)

        // Resident field
        clickElement('click', 'selector', this.ukResidentButton);
        clickElementWithText('click', 'element', resident);

        // Address 1 Field
        clickElement('click', 'selector', '#driverDetailsAddress1Input');
        setInputField('set', Address1, this.addressField1);

        //post town field
        clickElement('click', 'selector', this.postTownField);
        browser.pause(1000)
        setInputField('set', postTown, this.postTownField);

        //issuing nation drop down and field
        clickElement('click', 'selector', this.issuingNationDropDown);
        clickElementWithText('click', 'element', issuingNation);

        //driving licence field
        clickElement('click', 'selector', this.drivingLicenceNumberField);
        browser.pause(1000)
        setInputField('set', drivingLicenceNumber, this.drivingLicenceNumberField);

        // //Saving the data
        clickElement('click', 'selector', this.drivingSaveData);

    }
}

export default new DriverDetailsPageObject()