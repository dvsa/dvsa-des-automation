import clickElement from '../../support/common/action/clickElement'
import clickElementWithText from '../../support/common/action/clickElementWithText'
import setInputField from '../../support/common/action/setInputField'
import Page from '../base/page'

class EncounterDetailsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-encounter-details::page-title') }
    get locationDropDown() { return 'smc-encounter-details::location-field' };
    get nationalityDropDown() { return 'smc-encounter-details::nationality' };
    get vehicleIdFieldSelector() { return 'smc-encounter-details::vehicleid-field' };
    get vehicleType() { return 'smc-encounter-details::vehicleid-type' };
    get encounterReasonDropDown() { return 'smc-encounter-details::encounterReasonButtonFinder' };
    get vehicleTypeDropDown() { return 'smc-encounter-details::vehicleTypeButtonFinder' };

    public fillEncounterDetails(data: any) {
        const { location, nationality, vehicleid, vehicleType, encounterReason } = data;

        console.info('Filling in mandatory encounter details');

        clickElement('click', 'selector', this.locationDropDown);
        clickElementWithText('click', 'ionic-list-button', location);

        clickElement('click', 'selector', this.nationalityDropDown);
        clickElementWithText('click', 'button', nationality);

        clickElement('click', 'selector', this.vehicleIdFieldSelector);
        setInputField('set', vehicleid, this.vehicleIdFieldSelector)

        clickElement('click', 'selector', '#encounterGeneralVehicleTypeInput');
        clickElementWithText('click', 'button', vehicleType);

        clickElement('click', 'selector', '#encounterReasonDropdown');
        clickElementWithText('click', 'button', encounterReason);
    }

}

export default new EncounterDetailsPageObject()