import Page from '../base/page'

class VehicleWeightsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-vehicle-weights::page-title') }
    get compensatingRelationshipDropButton() { return this.getSelector('smc-vehicle-weights::compensating-relationship-drop-button') }
    get modalCheckboxOkButton() { return this.getSelector('smc-vehicle-weights::nthModalCheckboxOkButton') }

    nthAxleActual(axleNumber: number, actual: number) {
        let axleActual = this.getSelector(`#weightBridgeActualWeightResult_${axleNumber} input`);
        axleActual.setValue(actual);
    }

    nthAxlePermitted(axleNumber: number, permitted: number) {
        let axlePermitted = this.getSelector(`#weightBridgePermittedWeightResult_${axleNumber} input`);
        axlePermitted.setValue(permitted);
    }

    nthAxleRaised(axleNumber: number) {
        let axleRaisedToggle = this.getSelector(`#weightBridgeRaisedToggle_${axleNumber} button`);
        axleRaisedToggle.click();
    }

    nthAxleCompensateAndSelectRelationship(axleNumber: number, relationshipNumber: number, compensatingRelationship: number[]) {
        
        let compensatingToggle = this.getSelector(`#weightBridgeCompToggle_${axleNumber} button`);

        compensatingToggle.click();
        this.compensatingRelationshipDropButton.click();

        for (let relationshipIndex = 0; relationshipIndex < relationshipNumber; relationshipIndex++) {
            this.selectRelationshipCheckboxWithModal(`Axle ${compensatingRelationship[relationshipIndex]}`);
        }
        
        this.modalCheckboxOkButton.click();
    }

    async selectRelationshipCheckboxWithModal(optionText: string) {
        let selectCheckboxWithModal = this.getSelector(`//*[contains(text(), '${optionText}')]/ancestor::button[@role='checkbox']`);
        selectCheckboxWithModal.click();
    }
}

export default new VehicleWeightsPageObject()