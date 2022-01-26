import Page from '../base/page'

class DangerousGoodsQuestionsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-dangerousgoods-questions::page-title') }

    clickDangerousGoodsQuestionsOptionsByCategory(category: string, type: string){

        let dangerousgoodOption = this.getSelector(`//ion-item-group//ion-item//*[contains(text(), "${category}")]/parent::*/parent::*/parent::*/parent::*//ion-segment//ion-segment-button[contains(text(), "${type}")]`);
        dangerousgoodOption.click();
    }
}

export default new DangerousGoodsQuestionsPageObject()