import Page from '../base/page'

class RecordDefectsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-record-defects::page-title') }

    async selectCard(value: string) {
        const selector = this.getSelector(`//h2[contains(text(), '${value}')]/ancestor::ion-row`);
        selector.click();
    }
}

export default new RecordDefectsPageObject()