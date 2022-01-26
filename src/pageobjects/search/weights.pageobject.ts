import clickElement from '../../support/common/action/clickElement';
import clickElementWithText from '../../support/common/action/clickElementWithText';
import setInputField from '../../support/common/action/setInputField';
import Page from '../base/page'

class WeightsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-weights::page-title') }
    get numberAxlesCard1() { return 'smc-weights::number-axles-card-1' }
    get vehicleCardClick() { return 'smc-weights::vehicle-card-click' }
    get axle1ActualValue() { return 'smc-weights::vehicle-axle-1-actual' }
    get axle1PermittedValue() { return 'smc-weights::vehicle-axle-1-permitted' }
    get axle2ActualValue() { return 'smc-weights::vehicle-axle-2-actual' }
    get axle2PermittedValue() { return 'smc-weights::vehicle-axle-2-permitted' }
    get axle3ActualValue() { return 'smc-weights::vehicle-axle-3-actual' }
    get axle3PermittedValue() { return 'smc-weights::vehicle-axle-3-permitted' }
    get saveData() { return 'smc-weights::save-data-button' }
    get calculate() { return 'smc-weights::calculate-button' }
    get saveDataCalculate() { return 'smc-weights::save-calculate-button' }
    get alertPopUp() { return 'smc-weights::ok-button' }

    

    fillWeightsFromDataTable(data: any) {
        const { axleNumber, axle1Actual, axle1Permitted, axle2Actual, axle2Permitted, axle3Actual, axle3Permitted } = data;
        console.info('Filling in weights page');
        //3 axle vehicle
        clickElement('click', 'selector', this.numberAxlesCard1);
        clickElementWithText('click', 'element', axleNumber);
        clickElement('click', 'selector', this.vehicleCardClick);
        setInputField('set', axle1Actual, this.axle1ActualValue);
        setInputField('set', axle1Permitted, this.axle1PermittedValue);
        setInputField('set', axle2Actual, this.axle2ActualValue);
        setInputField('set', axle2Permitted, this.axle2PermittedValue);
        setInputField('set', axle3Actual, this.axle3ActualValue);
        setInputField('set', axle3Permitted, this.axle3PermittedValue);
        clickElement('click', 'selector', this.saveData);
        clickElement('click', 'selector', this.calculate);
        clickElement('click', 'selector', this.saveDataCalculate);
    }
}

export default new WeightsPageObject()