import Page from '../base/page'

import * as credentials from '../../../creds/credentials.json';
const faker = require("faker/locale/en_GB");

class LoginPageObject extends Page {

    //'//XCUIElementTypeButton[@name="Continue"]'
    get msContinueButton() { return this.getSelector('~Continue') }
    get msContinueButton2() { return this.getSelector('#idSIButton9') }
    get msEmailTextbox() { return this.getSelector('//input[@name="loginfmt"]') }
    get msPasswordTextBox() { return this.getSelector('#passwordInput') }
    get msSigninButton() { return this.getSelector('#submitButton') }
    get msSubmitButton() { return this.getSelector('input[type="submit"]') }

    private _contextTitleForPage: string = 'Sign in to your account';

    getRandomSuperUser() {
        const randomId = faker.datatype.number(0, credentials.Environment.Dev.Super.length);
        return credentials.Environment.Dev.Super[randomId];
    }

    getSuperUser(id:number) {
        return credentials.Environment.Dev.Super[id];
    }

    clickNativeContinueButton() {

        this.switchToNativeContext();

        if (this.msContinueButton.isExisting()) {
            this.msContinueButton.click();

            // Wait for the button to disappear
            this.msContinueButton.waitForDisplayed({ reverse: true, interval: 200 });
        }
    }

    clickWebContinue() {
        // const source = browser.getPageSource();
        // console.log(source);

        if (this.msContinueButton2.isExisting()) {
            //@ts-ignore
            this.msContinueButton2.waitAndClick();

            // this.msContinueButton2.waitForClickable({ interval: 50 })
            // this.msContinueButton2.click();
            // this.msContinueButton2.waitForDisplayed({ reverse: true, interval: 50 });
        }
    }

    checkAlreadyLoggedIn() {
        return !this.doesContextExist(this._contextTitleForPage);
    }

    loginWeb() {
       
        // const user = this.getRandomSuperUser();
       
        const user = this.getSuperUser(0);

        //@ts-ignore
        // browser.sharedStore.set('user-logged-in', user);

        const contexts: any = driver.getContexts();

        if (this.doesContextExist(this._contextTitleForPage)) {
         
            // Click the native button should we need to.
            this.clickNativeContinueButton();

            console.info('>>>>>Logging In');

            this.switchContextByTitle('Sign in to your account');

            this.msEmailTextbox.waitForExist();
            this.msEmailTextbox.setValue(user.UserEmail);
            this.msSubmitButton.click();
            this.msPasswordTextBox.waitForExist();
            this.msPasswordTextBox.setValue(user.Password);
            this.msSigninButton.click();

            this.clickWebContinue();
        } 

        // Wait for the database spinner to go
        // this.databaseSpinner.waitForDisplayed({ interval: 50 });
        // this.databaseSpinner.waitForDisplayed({ reverse: true, interval: 50 });

    } //loginWeb
}

export default new LoginPageObject()
