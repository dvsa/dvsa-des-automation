import clickElement from '../../support/common/action/clickElement';
import clickElementWithText from '../../support/common/action/clickElementWithText';
import setInputField from '../../support/common/action/setInputField';
import Page from '../base/page'

class FixedPenaltyPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-fixed-penalty::page-title') }
    get fixedPenaltyButton() { return ('smc-currentencounter::fixed-penalty-button') }
    get driver1AddButton() { return 'smc-fixed-penalty::driver1-add-button' }
    get driver2AddButton() { return 'smc-fixed-penalty::driver2-add-button' }
    get issueFixedPenaltyToggle() { return 'smc-fixed-penalty::driver-issue-toggle' }
    get withdrawPopUp() { return 'smc-fixed-penalty::withdraw-notice-pop-up' }
    get additionalText() { return 'smc-additional-information::additional-text' }
    get additionalSaveData() { return 'smc-encounter-details::additionalTextSaveButtonFinder' }
    get reviewAndPrint() { return 'smc-notices::review-print-button' }
    get continue() { return 'review-and-print-notices::continueEncounterButtonFinder' }
    get leave() { return 'smc-fixed-penalty::leave' }
    get recordPaymentButton() { return 'smc-fixed-penalty::record-paymet-button' }
    get saveDataButton() { return 'smc-fixed-penalty::save-data-button' }
    get paymentMethodDropDown() { return 'smc-fixed-penalty::payment-method-drop-button' }
    get cashAmountField() { return 'smc-fixed-penalty::cash-amount' }
    get saveDataButton2() { return 'smc-fixed-penalty::savedata-button' }
    get backButton() { return 'smc-baseionic::backbuttonfinder' }

    fillFixedPenalty(data: any) {
        const { paymentMethod, cashAmount } = data;

        console.log("Adding Fixed Penalty to Driver")
        clickElement('click', 'selector', this.issueFixedPenaltyToggle);
        console.log("Record")
        clickElement('click', 'selector', this.recordPaymentButton);
        clickElement('click', 'selector', this.paymentMethodDropDown);
        clickElementWithText('click', 'element', paymentMethod);
        clickElement('click', 'selector', this.cashAmountField);
        setInputField('set', cashAmount, this.cashAmountField);
        clickElement('click', 'selector', this.saveDataButton);
        clickElement('click', 'selector', this.saveDataButton2);
        // clickElement('click', 'selector', this.backButton);
    }

    withdrawFixedPenalty(data: any) {
        const { additional, paymentMethod, cashAmount } = data;

        let driverOperations = [
            this.fixedPenaltyButton,
            this.driver2AddButton,
            this.issueFixedPenaltyToggle
        ]

        let elementArray = [
            this.saveDataButton2,
            this.driver2AddButton,
            this.issueFixedPenaltyToggle,
            this.withdrawPopUp,
            this.additionalText
        ]

        this.multiElementClicker(driverOperations);
        this.multiElementClicker(elementArray);
        setInputField('set', additional, this.additionalText);
        clickElement('click', 'selector', '#additionalTextSaveButton');
        clickElement('click', 'selector', this.issueFixedPenaltyToggle);
        clickElement('click', 'selector', this.saveDataButton2);
        clickElement('click', 'selector', this.driver2AddButton);
        clickElement('click', 'selector', this.issueFixedPenaltyToggle);
        clickElement('click', 'selector', this.recordPaymentButton);
        clickElement('click', 'selector', this.paymentMethodDropDown);
        clickElementWithText('click', 'element', paymentMethod);
        clickElement('click', 'selector', this.cashAmountField);
        setInputField('set', cashAmount, this.cashAmountField);
        clickElement('click', 'selector', this.saveDataButton);
        clickElement('click', 'selector', this.saveDataButton2);
        clickElement('click', 'selector', this.reviewAndPrint);
        clickElement('click', 'selector', '#continueEncounter');
        clickElement('click', 'selector', this.leave);

    }

    multiElementClicker(elementArray: string[]) {

        elementArray.forEach((element: string) => {
            clickElement('click', 'selector', element);
        });
    }
}

export default new FixedPenaltyPageObject()