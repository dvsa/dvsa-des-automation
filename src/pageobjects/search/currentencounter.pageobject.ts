import Page from '../base/page'

class CurrentEncounterPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-currentencounter::page-title') }

}

export default new CurrentEncounterPageObject()