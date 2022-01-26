import clickElement from '../../support/common/action/clickElement'
import clickElementWithText from '../../support/common/action/clickElementWithText'
import setInputField from '../../support/common/action/setInputField'
import Page from '../base/page'

class DangerousGoodsDetailsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-dangerousgoods-details::page-title') }
    get modeOfTransportDropDown() { return ('smc-dangerousgoods-details::mode-of-transport-drop-button') }
    get unNumberField() { return ('smc-dangerousgoods-details::un-number') }
    get quantityOfGoods() { return ('smc-dangerousgoods-details::quantity-of-goods') }
    get unitsDropDown() { return ('smc-dangerousgoods-details::unit-drop-button') }
    //consignor fields
    get consignorField() { return ('smc-dangerousgoods-details::consignor') }
    get consignorAddress1() { return ('smc-dangerousgoods-details::consignor-address-line1') }
    get consignorPostTown() { return ('smc-dangerousgoods-details::consignor-posttown') }
    //consignee fields
    get consigneeField() { return ('smc-dangerousgoods-details::consignee') }
    get consigneeAddress1() { return ('smc-dangerousgoods-details::consignee-address-line1') }
    get consigneePostTown() { return ('smc-dangerousgoods-details::consignee-posttown') }
    //dangerous goods questions
    get dangerousGoodsQuestionsButton() { return ('smc-dangerousgoods-details::dangerous-goods-questions-drop-button') };
    get dangerousGoodsQuestionsSaveDataButton() { return ('smc-dangerousgoods-questions::save-data-button') }
    //save data button
    get dangerousGoodsSaveData() { return ('smc-dangerousgoods-details::save-data-button') }

    public fillDangeroudGoodsFromDataTable(data: any) {
        const { modeTransport, unNumber, quantity, units, consignor, consignorAddress1, consignorPostTown, consignee, consigneeAddress1, consigneePostTown } = data;

        console.info('Filling in mandatory Dangerous Goods details');
        //mode of transport drop down
        clickElement('click', 'selector', this.modeOfTransportDropDown);
        clickElementWithText('click', 'element', modeTransport);

        //un number field
        clickElement('click', 'selector', this.unNumberField);
        setInputField('set', unNumber, this.unNumberField);

        //quantity of goods field
        clickElement('click', 'selector', this.quantityOfGoods);
        setInputField('set', quantity, this.quantityOfGoods);

        //units drop down
        clickElement('click', 'selector', this.unitsDropDown);
        clickElementWithText('click', 'element', units);

        /***
        * consignee fields
        * consignee post town
        * consignee address 1 field
        */
        clickElement('click', 'selector', '#dangerousGoodsConsigneeInput');
        setInputField('set', consignee, this.consigneeField);

        clickElement('click', 'selector', '#dangerousGoodsConsigneeAddress1Input');
        setInputField('set', consigneeAddress1, this.consigneeAddress1);

        clickElement('click', 'selector', '#dangerousGoodsConsigneePostTownInput');
        setInputField('set', consigneePostTown, this.consigneePostTown);

        /***
       * consignor fields
       * consignor post town
       * consignor address 1 field
       */
        clickElement('click', 'selector', this.consignorField);
        setInputField('set', consignor, this.consignorField);

        clickElement('click', 'selector', this.consignorAddress1);
        setInputField('set', consignorAddress1, this.consignorAddress1);

        clickElement('click', 'selector', this.consignorPostTown);
        setInputField('set', consignorPostTown, this.consignorPostTown);

        clickElement('click', 'selector', this.dangerousGoodsQuestionsButton);

        clickElement('click', 'selector', this.dangerousGoodsQuestionsSaveDataButton);

        //Saving the data
        clickElement('click', 'selector', this.dangerousGoodsSaveData);

    }
}

export default new DangerousGoodsDetailsPageObject()