import waitForDisplayed from 'webdriverio/build/commands/element/waitForDisplayed';
import dragElement from '../../support/common/action/dragElement';
import ionicSwipeItemSliding from '../../support/ionic/ionic-action/ionic-swipeItemSliding';
import waitUntilElementStopsMoving from '../../support/lib/waitUntilElementStopsMoving';
import Page from '../base/page'

class RecordOffencesPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-record-offences::page-title') }
    get offenceAmountDescription() { return this.getSelector('smc-record-offences::offence-amount-description') }

    private _firstOffenceTemplate: string = '(//h2[contains(text(), "driver")]/ancestor::ion-card//ion-list//button)[idx]';
    private _offenceButtonTemplate: string = "/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-offences/ion-content/div[2]/div/ion-card[1]/ion-list/div/mobile-offence-component/ion-row[idx]/ion-item-sliding/ion-item/div[1]/button";
    private _offenceDeleteButtonTemplate: string = "/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-offences/ion-content/div[2]/div/ion-card[1]/ion-list/div/mobile-offence-component/ion-row[idx]/ion-item-sliding/ion-item-options/button\n";

    driver(driverNameOrNumber: string | number) {

        const selector = this.getSelector(`//h2[contains(text(), "${driverNameOrNumber}")]/ancestor::ion-row`);

        if (typeof driverNameOrNumber === 'number') {
            driverNameOrNumber = `Driver ${driverNameOrNumber}`;
        }

        selector.click();
    }

    removeFirstOffenceOnDriver(driverNameOrNumber: string) {
        let offenceItem: string = this._firstOffenceTemplate.replace('driver', driverNameOrNumber);
        let offenceDeletebutton: string = this._firstOffenceTemplate.replace('driver', driverNameOrNumber);
        offenceItem = offenceItem.replace('idx', '1');
        offenceDeletebutton = offenceDeletebutton.replace('idx', '2');

        const selector = this.getSelector(`//h2[contains(text(), "${driverNameOrNumber}")]/ancestor::ion-row`);

        const firstDriverOffenceButton = this.getSelector(offenceItem);
        const firstDriverOffenceDeleteButton = this.getSelector(offenceDeletebutton);

        const location = firstDriverOffenceButton.getLocation()

        browser.touchAction([
            { action: 'press', x: location.x -5, y: location.y - 10},
            { action: 'moveTo', x: location.x + 50, y: location.y },
            'release'
        ])

         waitUntilElementStopsMoving(offenceItem, 3000);
         firstDriverOffenceDeleteButton.click();
    }

    numberOfOffencesOnDriver(driverNameOrNumber: string): number {
        let offenceItem: string = this._firstOffenceTemplate.replace('driver', driverNameOrNumber);
        offenceItem = offenceItem.replace('[idx]', '');

        const selector = this.getSelector(offenceItem);

        return Number(selector.getSize());
    }

    removeAllOffencesOnDriver(driverNameOrNumber: string) {
        const numOffences: number = this.numberOfOffencesOnDriver(driverNameOrNumber);
        for (let index = 0; index < numOffences; index++) {
            this.removeFirstOffenceOnDriver(driverNameOrNumber);
        }
    }

    checkOffenceAmountTextAvailable(): boolean {
        let elementExistOnPage = false;

        try {
            this.offenceAmountDescription.waitForExist({ reverse: true, interval: 50 });
            elementExistOnPage = true;
        } catch (e) {
            elementExistOnPage = false;
        }
        return elementExistOnPage
    }

    offenceButtonText(rowNumber: number): string {
        const offenceButtonText: string = '/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-offences/ion-content/div[2]/div/ion-card[1]/ion-list/div/mobile-offence-component/ion-row['+ rowNumber +']/ion-item-sliding/ion-item/div[1]/div/ion-label/h3';
        const selector = this.getSelector(offenceButtonText);
        
        selector.waitForDisplayed();
        return selector.getText();
    }

    removeSpecificOffencesOnDriver(driverNameOrNumber: string, offenceDescriptionToRemove: string) {
        let numOffences: number = this.numberOfOffencesOnDriver(driverNameOrNumber) + 1; //In order to iterate through element index

        const exist = this.checkOffenceAmountTextAvailable();

        for (let index = 0; index < numOffences; index++) {

            if (exist) {
                if (index === 0 || index === 1) {
                 console.log('Skipping offence index' + index + ' as element doesnt exist...');
                } else {
                    const offenceDescription: string = this.offenceButtonText(index);

                    if (offenceDescription.toLowerCase().includes(offenceDescriptionToRemove.toLowerCase())) {
                        //Replacing index values from element template above to create dynamic element xpath for usage
                        let offenceItem = this._offenceButtonTemplate.replace('idx', index.toString());
                        let offenceDeleteButton = this._offenceDeleteButtonTemplate.replace('idx', index.toString());

                        const firstDriverOffenceButton = this.getSelector(offenceItem);
                        const firstDriverOffenceDeleteButton = this.getSelector(offenceDeleteButton);
                        const location = firstDriverOffenceButton.getLocation()

                        browser.touchAction([
                            { action: 'press', x: location.x -5, y: location.y - 10},
                            { action: 'moveTo', x: location.x + 50, y: location.y },
                            'release'
                        ])

                         waitUntilElementStopsMoving(offenceItem, 3000);
                         firstDriverOffenceDeleteButton.click();
                        break;
                    } else {
                    }
                }
            }
        }
    }

}

export default new RecordOffencesPageObject()