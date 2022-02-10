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

  getSuperUser() {
    const totalUsers = credentials.Environment.Dev.Super.length
    const randomUserId = Math.floor(Math.random() * totalUsers);
    return credentials.Environment.Dev.Super[randomUserId - 1];
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

  getRandomUserType( userType:string) {
    console.log(userType)
    console.log("total users of type:",credentials.Environment.Dev[userType].length)
    const totalUsers = credentials.Environment.Dev[userType].length
    const randomUserId= Math.floor(Math.random()*totalUsers);
    return credentials.Environment.Dev[userType][randomUserId - 1];
  }

  //desktoplogin
  desktopLogin() {
    // const user = this.getRandomSuperUser();
    console.info('>>>>>Switching to login tab')
    browser.switchWindow('Sign in to your account')
    const superUser = this.getSuperUser();
    console.info('>>>>>Logging In');
    console.info('Filling in email and Password');
    this.msEmailTextbox.waitForExist();
    this.msEmailTextbox.setValue(superUser.UserPrincipalName);
    this.msSubmitButton.click();
    this.msPasswordTextBox.waitForExist();
    this.msPasswordTextBox.setValue(superUser.Password);
    console.info(`click sign in button`);
    this.msSigninButton.click();
    console.info('>>>>>Switching back to app')
    browser.switchWindow('DVSA Search')
  } //desktoplogin

  // mobile log in
  loginWeb() {
    const superUser = this.getSuperUser();

    //@ts-ignore
    // browser.sharedStore.set('user-logged-in', user);

    // Click the native button should we need to.
    console.log(`User : >>> ${JSON.stringify(superUser.Name)}`);

    console.info('>>>>>Checking for the native continue button');
    this.clickNativeContinueButton();
    console.info('>>>>>Continue button clicked');

    if (this.doesContextExistByArray([this._contextTitleForPage])) {
      console.info('>>>>>Logging In');
      this.switchContextByTitleArray([this._contextTitleForPage]);
      this.checkCookiesExist();
      console.info('Filling in email and Password');
      this.msEmailTextbox.waitForExist();
      this.msEmailTextbox.setValue(superUser.UserPrincipalName);
      this.msSubmitButton.click();
      this.msPasswordTextBox.waitForExist({ timeout: 30000, reverse: false, interval: 50, timeoutMsg: `Element ${JSON.stringify(this.msPasswordTextBox)} did not exist on page within 15 seconds` });
      this.msPasswordTextBox.setValue(superUser.Password);
      console.info(`click sign in button`);
      this.msSigninButton.click();
      console.info(`clicked sign in button`);
      console.info(`wait for sign in button to disappeare sign in button`);
      this.msSigninButton.waitForExist({ timeout: 30000, reverse: false, interval: 50, timeoutMsg: `Element ${JSON.stringify(this.msSigninButton)} did not exist on page within 15 seconds` });

      // this.msContinueButton2.waitForExist({ reverse: true, interval: 50 });
      console.info(`wait for continue button`);
      this.msContinueButton2.waitForExist({ timeout: 30000, reverse: false, interval: 50, timeoutMsg: `Element ${JSON.stringify(this.msContinueButton2)} did not exist on page within 15 seconds` });

      this.msContinueButton2.waitForClickable({ timeout: 30000, reverse: false, interval: 50, timeoutMsg: `Element ${JSON.stringify(this.msContinueButton2)} was not clickable within 15 seconds` })
      console.info(`click continue button`);

      this.msContinueButton2.click();
      // Wait for the button to go before moving on
      console.info('Waiting for disappearance of sign in button');
      browser.pause(30000)

      console.log('Wait for context to leave so the login page isnt there anymore')
      this.waitForContextToLeave(this._contextTitleForPage);
    }
    // this.switchContextByTitleArray(["DVSA Search"]);
    this.switchContext(this._dvsaAppContextTitle);

    console.log(`THIS IS VERSION  :::: ${$('.bottomright').getText()}`)

  } //loginWeb

  // mobile log in
  loginWebAsUser(typeOfUser: string) {
    this.checkCookiesExist();
    const user = this.getRandomUserType(typeOfUser);
    console.log(`Signing in with User : >>> ${JSON.stringify(user.Name)}`);
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
      this.msPasswordTextBox.waitForExist({ timeout: 30000, reverse: false, interval: 50, timeoutMsg: `Element ${JSON.stringify(this.msPasswordTextBox)} did not exist on page within 15 seconds` });
      this.msPasswordTextBox.setValue(user.Password);
      console.info(`click sign in button`);
      this.msSigninButton.click();
      console.info(`clicked sign in button`);
      console.info(`wait for sign in button to disappeare sign in button`);
      this.msSigninButton.waitForExist({ timeout: 30000, reverse: false, interval: 50, timeoutMsg: `Element ${JSON.stringify(this.msSigninButton)} did not exist on page within 15 seconds` });

      // this.msContinueButton2.waitForExist({ reverse: true, interval: 50 });
      console.info(`wait for continue button`);
      this.msContinueButton2.waitForExist({ timeout: 30000, reverse: false, interval: 50, timeoutMsg: `Element ${JSON.stringify(this.msContinueButton2)} did not exist on page within 15 seconds` });

      this.msContinueButton2.waitForClickable({ timeout: 30000, reverse: false, interval: 50, timeoutMsg: `Element ${JSON.stringify(this.msContinueButton2)} was not clickable within 15 seconds` })
      console.info(`click continue button`);

      this.msContinueButton2.click();
      // Wait for the button to go before moving on
      console.info('Waiting for disappearance of sign in button');
      browser.pause(30000)

      console.log('Wait for context to leave so the login page isnt there anymore')
      this.waitForContextToLeave(this._contextTitleForPage);
    }
    // this.switchContextByTitleArray(["DVSA Search"]);
    this.switchContext(this._dvsaAppContextTitle);

    console.log(`THIS IS VERSION  :::: ${$('.bottomright').getText()}`)

  } //loginWeb

}

export default new LoginPageObject()
