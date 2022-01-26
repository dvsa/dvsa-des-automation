import clickElement from '../../support/common/action/clickElement'
import clickElementWithText from '../../support/common/action/clickElementWithText'
import setInputField from '../../support/common/action/setInputField'
import Page from '../base/page'

class VehicleDetailsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-vehicle-details::page-title') }
    get customMakeField() { return 'smc-vehicle-details::make-custom-input' }
    get modelField() { return 'smc-vehicle-details::model' }
    get bodyTypeDropDown() { return 'smc-vehicle-details::body-type-drop-button' }
    get odometerField() { return 'smc-vehicle-details::odometer-field' }
    get seatingField() { return 'smc-vehicle-details::seating-field' }
    get saveDataButton() { return 'smc-vehicle-details::save-data-button' }
    get vehiclePageClick() { return 'smc-vehicle-details::vehicle-page-click'}

    public fillVehicleDetailsFromDataTable(data: any) {
        const { make, model, body, seating, odometer } = data;

        console.info('Filling in mandatory vehicle details');
        // clickElement('click', 'selector', this.vehiclePageClick);
        clickElement('click', 'selector', this.customMakeField);
        setInputField('set', make, this.customMakeField);
        clickElement('click', 'selector', this.modelField);
        setInputField('set', model, this.modelField);

        if(body !== 'NA'){
            clickElement('click', 'selector', this.bodyTypeDropDown);
            clickElementWithText('click', 'element', body);
        }

        clickElement('click', 'selector', this.odometerField);
        setInputField('set', odometer, this.odometerField);

        if(seating !== 'NA'){
            clickElement('click', 'selector', '#encounterVehicleSeatingCapacityInput');
            setInputField('set', seating, '#encounterVehicleSeatingCapacityInput input');
        }
        
        clickElement('click', 'selector', this.saveDataButton);
    }
}

export default new VehicleDetailsPageObject()