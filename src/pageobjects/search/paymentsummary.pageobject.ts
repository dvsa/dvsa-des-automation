import waitForDisplayed from 'webdriverio/build/commands/element/waitForDisplayed';
import Page from '../base/page'

class PaymentSummaryPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-payment-summary::page-title') }
    get recordPaymentButton() { return this.getSelector('smc-print-options-modal::record-payment-button') }
}

export default new PaymentSummaryPageObject()