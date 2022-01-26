import clickElement from '../../support/common/action/clickElement';
import clickElementWithText from '../../support/common/action/clickElementWithText';
import setInputField from '../../support/common/action/setInputField';
import waitFor from '../../support/common/action/waitFor';
import Page from '../base/page'

class TrailerDetailsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-trailer-details::page-title') }

    get nationalityDropDown() { return 'smc-trailer-details::nationality-button' }
    get trailerIdTypeDropDown() { return 'smc-trailer-details::trailerid-type-button' }
    get trailerIdField() { return 'smc-trailer-details::trailerid' }
    get trailerTypeDropDown() { return 'smc-trailer-details::trailer-type-dropdown' }
    get trailerMakeDropDown() { return 'smc-trailer-details::make-drop-button' }
    get trailerSaveDataButton() { return 'smc-trailer-details::save-data-button' }
    get dbSpinner() { return 'smc-general::db-spinner'}

    public fillTrailerDetailsFromDataTable(data: any) {
        const { nationality, trailerIdType, trailerId, TrailerType, TrailerMake } = data;

        console.info('Filling in mandatory Trailer 1 details');
        //nationality drop down
        clickElement('click', 'selector', this.nationalityDropDown);
        clickElementWithText('click', 'element', nationality);

        //trailer id drop down
        clickElement('click', 'selector', this.trailerIdTypeDropDown);
        clickElementWithText('click', 'element', trailerIdType);

        //trailer id field
        clickElement('click', 'selector', this.trailerIdField);
        setInputField('set', trailerId, this.trailerIdField);
        // clickElement('click', 'selector', this.trailerSaveDataButton);

        browser.pause(5000);
        
        //trailer type field/drop down
        clickElement('click', 'selector', this.trailerTypeDropDown);
        // first click initiates a loading/searching .. second click opens the list
        // clickElement('click', 'selector', this.trailerTypeDropDown);
        clickElementWithText('click', 'element', TrailerType);

        //trailer make field/drop down
        clickElement('click', 'selector', this.trailerMakeDropDown);
        clickElementWithText('click', 'element', TrailerMake);

        // //Saving the data
        clickElement('click', 'selector', this.trailerSaveDataButton);
    }
}


export default new TrailerDetailsPageObject()