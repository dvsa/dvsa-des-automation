import waitForDisplayed from 'webdriverio/build/commands/element/waitForDisplayed';
import Page from '../base/page'

class EncounterSearchSubmittedPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-encounter-search-submitted::page-title') }
}

export default new EncounterSearchSubmittedPageObject()