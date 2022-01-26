import { Selector } from 'webdriverio';
import waitForDisplayed from 'webdriverio/build/commands/element/waitForDisplayed';
import dragElement from '../../support/common/action/dragElement';
import ionicSwipeItemSliding from '../../support/ionic/ionic-action/ionic-swipeItemSliding';
import waitUntilElementStopsMoving from '../../support/lib/waitUntilElementStopsMoving';
import Page from '../base/page'

class FixedPenaltySummaryPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-fixed-penalty-summary::page-title') }

    private issueFixedPenaltyToggleButtonTemplate: string = '/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-encounter-fixed-penalty-summary/ion-content/div[2]/form/ion-card[idx]/ion-grid/ion-row[4]/ion-col[2]/ion-toggle/button';

    async issueAllFixedPenalty() {        
        const allToggleElements = $$('.ion-toggle button');
        
        for(let index = 0; index < allToggleElements.length; index++ ){
            const toggleButton = this.issueFixedPenaltyToggleButtonTemplate.replace('idx', (index + 2).toString());
            await this.getSelector(toggleButton).click();
            browser.pause(2000);
        }
    }

}

export default new FixedPenaltySummaryPageObject()