import clickElement from '../../support/common/action/clickElement'
import clickElementWithText from '../../support/common/action/clickElementWithText'
import setInputField from '../../support/common/action/setInputField'
import Page from '../base/page'

class JourneyDetailsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-journey-details::page-title') }
    get journeyPageClick() { return 'smc-currentencounter::journey-details-button' }
    get journeyType() { return 'smc-journey-details::journey-type-button' }
    get journeyStartLocation() { return 'smc-journey-details::start-location' }
    get journeyEndLocation() { return 'smc-journey-details::end-location' }
    get journeyGoodsCarried() { return 'smc-journey-details::goods-carried' }
    get journeyPortExit() { return 'smc-journey-details::port-of-exit-button' }
    get journeySaveData() { return 'smc-journey-details::save-data-button' }



    public fillJourneyDetailsFromDataTable(data: any) {
        const { type, startLocation, endLocation, goodsCarried } = data;
        console.info('Filling in mandatory journey details');

        // clickElement('click', 'selector', this.journeyPageClick);

        clickElement('click', 'selector', this.journeyType);

        clickElementWithText('click', 'element', type);

        /***
        * journey start location
        journey end location 
        journey goods carried
        */

        setInputField('set', startLocation, this.journeyStartLocation);


        setInputField('set', endLocation, this.journeyEndLocation);

        setInputField('set', goodsCarried, this.journeyGoodsCarried);

        //save data
        clickElement('click', 'selector', this.journeySaveData);


    }
}

export default new JourneyDetailsPageObject()