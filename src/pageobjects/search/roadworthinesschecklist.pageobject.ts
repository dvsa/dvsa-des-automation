import clickElement from '../../support/common/action/clickElement';
import Page from '../base/page'

class RoadworthinesschecklistPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-roadworthiness-checklist::page-title') }
    get saveData() { return ('smc-roadworthiness-checklist::save-data-button') }

    fillRoadworthinessFromDataTable(data:any){
        const { } = data;
        clickElement('click', 'selector', this.saveData);
    }
}

export default new RoadworthinesschecklistPageObject()