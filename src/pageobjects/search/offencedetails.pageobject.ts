import clickElement from '../../support/common/action/clickElement';
import clickElementWithText from '../../support/common/action/clickElementWithText';
import Page from '../base/page'

class OffenceDetailsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-offence-details::page-title') }
    get driver1CardClick() { return 'smc-offences::driver-1-card-click' }
    get driver2CardClick() { return 'smc-offences::driver-2-card-click' }
    get offenceTypeDropDown() { return 'smc-offences::offence-type-drop-button' }
    get offenceSubTypeDropDown() { return 'smc-offences::offence-subtype-drop-button' }
    get offenceDropDown() { return 'smc-offences::offencedrop-button' }
    get addOffence() { return 'smc-offences::addOffence-button' }
    get saveDataButton() { return 'smc-offence-details::save-data-button' }
    get continueEncounter() { return 'smc-offence-details::continue-encounter' }
    get offenceGroupDropdown() { return 'smc-offence-details::offence-group-drop-button' }

    fillOffencesDetailsFromDataTable(data: any) {
        const { offenceType, offenceSubType, offence } = data;
        console.info('Filling in offences details');
        clickElement('click', 'selector', this.offenceTypeDropDown);
        clickElementWithText('click', 'element', offenceType);
        
        if(offenceSubType !== 'NA'){
            clickElement('click', 'selector', this.offenceSubTypeDropDown);
            clickElementWithText('click', 'element', offenceSubType);
        }

        clickElement('click', 'selector', this.offenceDropDown);
        clickElementWithText('click', 'element', offence);
        clickElement('click', 'selector', '#addOffencesButton');
        clickElement('click', 'selector', this.saveDataButton);
    }

    fillOffencesDetailsWithOffenceGroupFromDataTable(data: any) {
        const { offenceType, offenceSubType, offenceGroup, offence } = data;
        console.info('Filling in offences details');
        clickElement('click', 'selector', this.offenceTypeDropDown);
        clickElementWithText('click', 'element', offenceType);
        clickElement('click', 'selector', this.offenceSubTypeDropDown);
        clickElementWithText('click', 'element', offenceSubType);
        clickElement('click', 'selector', "#offenceGroupDropdown");
        clickElementWithText('click', 'element', offenceGroup);
        clickElement('click', 'selector', this.offenceDropDown);
        clickElementWithText('click', 'element', offence);
        clickElement('click', 'selector', '#addOffencesButton');
        clickElement('click', 'selector', this.saveDataButton);

    }
}

export default new OffenceDetailsPageObject()