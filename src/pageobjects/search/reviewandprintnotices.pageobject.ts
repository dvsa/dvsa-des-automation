import Page from '../base/page'

class ReviewAndPrintNoticesPageObject extends Page {

    get pageTitle() { return this.getSelector('review-and-print-notices::page-title') }
    get printButton() { return this.getSelector('review-and-print-notices::print-button') }

    printDocWithType(noticeName: string) {
        let selector = this.getSelector(`(//ion-label[contains(text(), "${noticeName.valueOf()}")]/../../ion-col)[2]//button`);
        selector.waitForExist();
        selector.click();
    }

    printNthDoc(idx:  number) {
        let selector = this.getSelector(`((//page-encounter-notice-review-and-print//ion-grid)[2]//button)[${idx}]`);
        selector.click();
    }

    numberOfDocsToPrint() {
        return this.printButton.getSize();
    }

}


export default new ReviewAndPrintNoticesPageObject()