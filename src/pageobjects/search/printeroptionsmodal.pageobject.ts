import waitForDisplayed from 'webdriverio/build/commands/element/waitForDisplayed';
import Page from '../base/page'

class PrinterOptionsModalPageObject extends Page {

    get modal() { return this.getSelector('smc-print-options-modal::modal') }
    get cancelButton() { return this.getSelector('smc-print-options-modal::cancel-button') }

    waitForModalOnPage(){
        this.switchToNativeContext();
        this.modal.waitForExist();
    }

    cancelPrinterModal(){
        this.cancelButton.click();
    }

}

export default new PrinterOptionsModalPageObject()