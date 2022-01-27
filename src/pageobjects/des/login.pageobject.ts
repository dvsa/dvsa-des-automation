import Page from '../base/page'

import * as credentials from '../../../creds/credentials.json';
const faker = require("faker/locale/en_GB");

class LoginPageObject extends Page {

  get msContinueButton() { return this.getSelector('//XCUIElementTypeButton[@name="Continue"]') }
  // get msContinueButton() { return this.getSelector('~Continue') }
  get msContinueButton2() { return this.getSelector('#idSIButton9') }
  get msAppConfirmTitle() { return this.getSelector('#appConfirmTitle') }
  get msEmailTextbox() { return this.getSelector('//input[@name="loginfmt"]') }
  get msPasswordTextBox() { return this.getSelector('#passwordInput') }
  // get msEmailTextbox() { return this.getSelector('//XCUIElementTypeTextField[@name="Enter your email, phone, or Skype."]') }
  // get msPasswordTextBox() { return this.getSelector('//XCUIElementTypeSecureTextField') }
  get msSigninButton() { return this.getSelector('#submitButton') }
  get msSubmitButton() { return this.getSelector('input[type="submit"]') }

  private _contextTitleForPage: string = 'Sign in to your account';
  private _dvsaAppContextTitle: string = 'DVSA Search';

  getRandomSuperUser() {
    const randomId = faker.datatype.number(0, credentials.Environment.Dev.Super.length);
    return credentials.Environment.Dev.Super[randomId];
  }

  getSuperUser(id: number) {
    return credentials.Environment.Dev.Super[id];
  }

  clickNativeContinueButton() {

    this.switchToNativeContext();

    browser.pause(1000);

    if (this.msContinueButton.isDisplayed() && this.msContinueButton.isExisting()) {

      console.log('Continue button found');
      this.msContinueButton.click();
      console.log('Continue button clicked');

      // Wait for the button to disappear
      // this.msContinueButton.waitForDisplayed({ reverse: true, interval: 200 });
    } else {
      console.log('No continue button found');
    }
  }

  checkAlreadyLoggedIn() {
    return !this.doesContextExistByArray([this._contextTitleForPage]);
  }

  checkCookiesExist() {
    let cookies = driver.getAllCookies();

    if (cookies !== null) {
      console.log('Cookies Delete');
      driver.deleteAllCookies();
      console.log('Refresh login page');
      driver.refresh();
    }
  }
  desktopLogin() {
    // const user = this.getRandomSuperUser();
    console.info('>>>>>Switching to login tab')
    browser.switchWindow('Sign in to your account')
    const user = this.getSuperUser(0);
    console.info('>>>>>Logging In');
    console.info('Filling in email and Password');
    this.msEmailTextbox.waitForExist();
    this.msEmailTextbox.setValue(user.UserPrincipalName);
    this.msSubmitButton.click();
    this.msPasswordTextBox.waitForExist();
    this.msPasswordTextBox.setValue(user.Password);
    console.info(`click sign in button`);
    this.msSigninButton.click();
    console.info('>>>>>Switching back to app')
    browser.switchWindow('DVSA Search')
  } //desktoplogin

  loginWeb() {
    // const user = this.getRandomSuperUser();
    const user = this.getSuperUser(0);

    //@ts-ignore
    // browser.sharedStore.set('user-logged-in', user);

    // Click the native button should we need to.
    console.info('>>>>>Checking for the native continue button');
    this.clickNativeContinueButton();
    console.info('>>>>>Continue button clicked');

    if (this.doesContextExistByArray([this._contextTitleForPage])) {
      console.info('>>>>>Logging In');
      this.switchContextByTitleArray([this._contextTitleForPage]);
      this.checkCookiesExist();
      console.info('Filling in email and Password');
      this.msEmailTextbox.waitForExist();
      this.msEmailTextbox.setValue(user.UserPrincipalName);
      this.msSubmitButton.click();
      this.msPasswordTextBox.waitForExist();
      this.msPasswordTextBox.setValue(user.Password);
      console.info(`click sign in button`);
      this.msSigninButton.click();
      this.msSigninButton.waitForExist({ reverse: true, interval: 50 });
      // this.msContinueButton2.waitForExist({ reverse: true, interval: 50 });
      this.msContinueButton2.waitForClickable({ interval: 50 })
      console.log('1')
      this.msContinueButton2.click();
      console.log('2')
      // Wait for the button to go before moving on
      console.info('Waiting for disappearance of sign in button');
      browser.pause(2000)
      // console.log('3')

      console.log('WAit for context to leave so the login page isnt there anymore')
      this.waitForContextToLeave(this._contextTitleForPage);
    }
    // this.switchContextByTitleArray(["DVSA Search"]);
    this.switchContext(this._dvsaAppContextTitle);

    console.log(`THIS IS VERSION  :::: ${$('.bottomright').getText()}`)

  } //loginWeb


}

export default new LoginPageObject()
