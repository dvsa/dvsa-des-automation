import clickElement from '../../support/common/action/clickElement';
import clickElementWithText from '../../support/common/action/clickElementWithText';
import setInputField from '../../support/common/action/setInputField';
import Page from '../base/page'

class OperatorVisitsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-operator-visits::page-title') }
    get startVisit() { return 'smc-operator-visits::start-new-visit' }
    get searchVisit() { return 'smc-operator-visits::search-visit-button' }
    get endDateDropDown() { return 'smc-operator-visits::end-date-drop-down' }
    get visitTypeDropDown() { return 'smc-operator-visits::visit-type-drop-down' }
    get caseNumber() { return 'smc-operator-visits::case-number' }
    get visitReasonDropDown() { return 'smc-operator-visits::visit-reason-drop-down' }
    get licenceNumber() { return 'smc-operator-visits::licence-number' }
    get operatorName() { return 'smc-operator-visits::operator-name' }
    get postCode() { return 'smc-operator-visits::post-code' }
    get addressline1() { return 'smc-operator-visits::address-line-1' }
    get addressline2() { return 'smc-operator-visits::address-line-2' }
    get addressline3() { return 'smc-operator-visits::address-line-3' }
    get addressline4() { return 'smc-operator-visits::address-line-4' }
    get postTown() { return 'smc-operator-visits::post-town' }
    get vehicleIdType() { return 'smc-operator-visits::vehicle-id-type' }
    get vehicleIdField() { return 'smc-operator-visits::vehicle-id-field' }
    get veEncounterResult() { return 'smc-operator-visits::ve-encounter-result' }
    get teAnalogueCharts() { return 'smc-operator-visits::te-analogue-charts' }
    get teDigitalDays() { return 'smc-operator-visits::te-digital-days' }
    get teDriversHours() { return 'smc-operator-visits::te-drivers-hours' }
    get teOtherSystems() { return 'smc-operator-visits::te-other-systems' }

    fillOperatorVisitsFromDataTable(data: any) {
        const { visitType, caseNo, visitReason, licenceNumber, operatorName, address1, postTown, analogue, digitalDays, driversHours, otherSystems, encounterResult, vehicleID } = data;
        console.log("Filling Operator Visits")
        switch (visitType) {
            case "TE":
                clickElement('click', 'selector', this.visitTypeDropDown);
                clickElementWithText('click', 'element', visitType);
                clickElement('click', 'selector', this.endDateDropDown);
                clickElementWithText('click', 'button', 'Done');
                browser.pause(200)
                setInputField('set', caseNo, this.caseNumber);
                clickElement('click', 'selector', this.visitReasonDropDown);
                clickElementWithText('click', 'element', visitReason);
                clickElement('click', 'selector', this.licenceNumber);
                setInputField('set', licenceNumber, this.licenceNumber);
                setInputField('set', operatorName, this.operatorName);
                setInputField('set', address1, this.addressline1);
                setInputField('set', postTown, this.postTown);
                clickElementWithText('click', 'button', 'Start Visit');
                clickElement('click', 'selector', this.teAnalogueCharts);
                setInputField('set', analogue, this.teAnalogueCharts);
                clickElement('click', 'selector', this.teDigitalDays);
                setInputField('set', digitalDays, this.teDigitalDays);
                clickElement('click', 'selector', this.teDriversHours);
                clickElementWithText('click', 'button', driversHours);
                clickElement('click', 'selector', this.teOtherSystems);
                clickElementWithText('click', 'button', otherSystems);
            break;
            case "VE":
                clickElement('click', 'selector', this.endDateDropDown);
                clickElementWithText('click', 'button', 'Done');
                browser.pause(200)
                setInputField('set', caseNo, this.caseNumber);
                clickElement('click', 'selector', this.visitReasonDropDown);
                clickElementWithText('click', 'element', visitReason);
                clickElement('click', 'selector', this.licenceNumber);
                setInputField('set', licenceNumber, this.licenceNumber);
                setInputField('set', operatorName, this.operatorName);
                setInputField('set', address1, this.addressline1);
                setInputField('set', postTown, this.postTown);
                clickElementWithText('click', 'button', 'Start Visit');
                clickElement('click', 'selector', this.vehicleIdField);
                setInputField('set', vehicleID, this.vehicleIdField);
                clickElement('click', 'selector', this.veEncounterResult);
                clickElementWithText('click', 'button', encounterResult);
                break;
            default:
                throw new Error("Visit type does not exist");
        }
    }
   
}

export default new OperatorVisitsPageObject()