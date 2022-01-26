import Page from '../base/page'
import clickElementWithText from '../../support/common/action/clickElementWithText'

class SearchPageObject extends Page {

    get searchInput() { return this.getSelector('smc-search::searchinput') }
    get ukButton() { return this.getSelector('smc-search::ukbutton') }
    get foreignButton() { return this.getSelector('smc-search::foreignbutton') }
    get vehicleDetailsResults() { return this.getSelector('#vehicleDetailsRegResult') }

    // Dashboard buttons
    get operatorDetailsButton() { return this.getSelector('smc-search::operatordetailsbutton') }
    get vehicleDetailsButton() { return this.getSelector('smc-search::vehicledetailsbutton') }
    get testHistoryButton() { return this.getSelector('smc-search::testhistorybutton') }
    get driverSearchButton() { return this.getSelector('smc-search::driversearchbutton') }
    get searchCopyEncounterButton() { return this.getSelector('smc-search::searchcopyencounterbutton') }
    get incompleteEncountersButton() { return this.getSelector('smc-search::incompleteencountersbutton') }


    // public async searchVehicle(vrnNumber: string) {
    //     await this.sendKeys(this._vehicleSearchButtonFinder, vrnNumber);
    //     await this.sendKeys(this._vehicleSearchButtonFinder, Key.ENTER);
    // }

    private enterVehicle(vehicleID: string) {
        this.searchInput.waitForDisplayed({ reverse: false, interval: 50 });
        this.searchInput.setValue(vehicleID + "\n");
    }

    private clickUKButton() {
        //@ts-ignore
        this.ukButton.waitAndClick();
    }

    private clickForeignButton() {
        //@ts-ignore
        this.foreignButton.waitAndClick();

        // Wait for the search to start
        this.searchingSpinner.waitForDisplayed({ reverse: false, interval: 50 });
    }

    private waitForResults() {
        // Wait for the spinner to finish
        this.searchingSpinner.waitForDisplayed({ reverse: true, interval: 50 });
    }

    public getResultsText() {
        this.vehicleDetailsButton.waitForDisplayed();
        return this.vehicleDetailsButton.getText();
    }

    async searchVehicle(vehicleID: string) {

        //@ts-ignore
        console.log(browser.sharedStore.get('user-logged-in'));

        this.databaseSpinner.waitForDisplayed({ reverse: true, interval: 50 });

        this.enterVehicle(vehicleID);
        this.clickUKButton();
        this.waitForResults();
    }

}

export default new SearchPageObject()