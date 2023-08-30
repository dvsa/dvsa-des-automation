import clickElement from '@shared-boilerplate/support/action/clickElement';
import clickElementWithText from '@shared-custom/support/action/clickElementWithText';
import waitFor from '@shared-boilerplate/support/action/waitFor';
import * as credentials from '../../../creds/credentials.json';
import Page from '../base/page';

class LoginMobilePageObject extends Page {
  private msSignInContextTitle: string = 'Sign in to your account';

  private msSignOutContextTitle: string = 'Sign out';

  get ionMenuButton() { return 'des-dashboard::menu-button-xpath'; }

  get logoutButton() { return 'des-dashboard::logout-button'; }

  async switchContextBySignId(contextTitle: string): Promise<void> {
    console.log('Inside switchContextBySignId');
    // wait for log in page
    await this.waitForContextToExist(contextTitle);
    const signingContext = await this.getContextByTitle(contextTitle);
    // @ts-ignore
    await driver.switchContext(signingContext.id);
  }

  async closeAllWindowsOLD(closeOldOnly: boolean = false): Promise<void> {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CLOSING ALL WINDOWS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    const browserHandlesArray = await browser.getWindowHandles();
    await driver.pause(5000);
    console.log('browserHandlesArray', browserHandlesArray);
    await this.gettingContextAndWindowHandles();
    await browser.pause(5000);
    await browser.switchToWindow(await browserHandlesArray[browserHandlesArray.length - 1]);
    if (closeOldOnly) {
      const index = browserHandlesArray.indexOf(`${await browser.getWindowHandle()}`);
      browserHandlesArray.splice(index, 1);
    }
    // eslint-disable-next-line no-plusplus
    for (let i = browserHandlesArray.length; i >= 1; --i) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
      // await driver.getWindowHandles();
      await this.gettingContextAndWindowHandles();
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
      console.log(`Switching to window $${browserHandlesArray[i - 1]}`);
      console.log('Pausing for 5 seconds');
      await browser.pause(5000);
      console.log('Pause done');
      await browser.switchToWindow(`WEBVIEW_${browserHandlesArray[i - 1]}`);
      console.log('Switched Window');
      await browser.closeWindow();
      console.log('Window closed');
    }
    console.info('>>>>>>>>>> Closing all windows done <<<<<<<<<<');
  }

  async closeAllWindows(closeOldOnly: boolean = false): Promise<void> {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CLOSING ALL WINDOWS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    const browserHandlesArray = await browser.getWindowHandles();
    await browser.switchToWindow(await browserHandlesArray[browserHandlesArray.length - 1]);
    if (closeOldOnly) {
      const index = browserHandlesArray.indexOf(`${await browser.getWindowHandle()}`);
      browserHandlesArray.splice(index, 1);
    }
    // eslint-disable-next-line no-plusplus
    for (let i = browserHandlesArray.length; i >= 1; --i) {
      console.log('In for loop');
      if (browserHandlesArray.length !== 0) {
        console.log('In if');
        console.log('Start Windows loop', await browser.getContexts());
        await browser.switchToWindow(`WEBVIEW_${browserHandlesArray[i - 1]}`);
        // LOOK AT TOMORROW
        // browser.navigateTo(url)
        console.log('Switched Window');
        console.log('browser.getUrl():   ', await browser.getUrl());
        await browser.closeWindow();
        console.log('Window closed');
        console.log('End Windows loop', await browser.getContexts());
      }
    }
    console.info('>>>>>>>>>> Closing all windows done <<<<<<<<<<');
  }

  async gettingContextAndWindowHandles(): Promise<void> {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Start gettingContextAndWindowHandles <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    console.log(await browser.getContext());
    console.log(await browser.getContexts());
    console.log(await browser.getWindowHandle());
    console.log(await browser.getWindowHandles());
    console.log('driver.status():   ', await driver.status());
    // console.log('browser.getUrl():   ', await driver.getUrl());
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> End gettingContextAndWindowHandles <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
  }

  async switchToWindowLastInArray(): Promise<void> {
    console.log('switching windows');
    const allWindowHandles = await browser.getWindowHandles();
    console.log('allWindowHandles', allWindowHandles);
    console.log('allWindowHandles length', allWindowHandles.length);
    console.log('allWindowHandles length', allWindowHandles[allWindowHandles.length - 1]);
    await browser.switchToWindow(`WEBVIEW_${allWindowHandles[allWindowHandles.length - 1]}`);
  }

  async login(typeOfUser: string): Promise<void> {
    // pause on app launch
    await browser.pause(7000);
    console.log('=');
    const user = credentials.Environment.Dev[typeOfUser][0];
    // await this.gettingContextAndWindowHandles();
    // console.log(await browser.getContexts());
    // await driver.terminateApp('com.apple.mobilesafari');
    // console.log(await browser.getContexts());
    // await driver.activateApp('uk.gov.dvsa.drivingexaminerservices');
    // await driver.terminateApp('uk.gov.dvsa.drivingexaminerservices');
    // await driver.activateApp('uk.gov.dvsa.drivingexaminerservices');
    // console.log(await browser.getContexts());
    // await browser.pause(7000);
    // await this.switchContextBySignId(this.msSignInContextTitle);
    await this.gettingContextAndWindowHandles();
    await this.switchToWindowLastInArray();
    console.log('==');
    const loginBackdrop: WebdriverIO.Element = await browser.$('#i0281');
    console.log('===');
    const alreadyLoggedInFirst: WebdriverIO.Element = await browser.$('#otherTileText');
    console.log('====');
    const loginError: WebdriverIO.Element = await browser.$('#loginSorry');
    console.log('=!=!=!');
    // #dashboard-burger-menu-btn
    // ion-menu-button
    const burgerMenu: WebdriverIO.Element = await browser.$('#dashboard-burger-menu-btn');

    await browser.pause(5000);
    await this.gettingContextAndWindowHandles();
    // await this.switchToDESContext();
    console.log('Promise.Race At start of test');
    // check if already logged in on app launch.
    await Promise.race([
      this.waitForExists(loginError),
      this.waitForExistAndClickable(alreadyLoggedInFirst),
      this.waitForExists(loginBackdrop),
      this.waitForExistAndClickable(burgerMenu),
    ]);

    if (await loginError.isDisplayed()) {
      throw new Error('log in error');
    }

    if (await burgerMenu.isDisplayed()) {
      await this.logout();
    }

    console.log('Closing All OLD windows');
    await this.closeAllWindows(true);

    // await this.clickNativeButtonWithText('Continue');

    // wait for log in page
    await this.switchContextBySignId(this.msSignInContextTitle);

    // click 'use another account if clickable
    console.log('+');
    const continueButton = await browser.$('input[value="Continue"]');
    console.log('++');
    const useAnotherAccount = await browser.$('#otherTileText');
    console.log('+++');
    const emailTextBox = await browser.$('#i0116');
    // const alreadyLoggedIn = await browser.$('#idSIButton9');
    // resolve as soo as either 'use another account' or email input available
    console.log('++++');
    await this.gettingContextAndWindowHandles();
    console.log('Promise.Race inside login');
    await Promise.race([
      // this.waitForExistAndClickable(continueButton),
      this.waitForExists(useAnotherAccount),
      this.waitForExists(emailTextBox),
      // this.waitForExistAndClickable(alreadyLoggedIn),
    ]);

    // If the app is already logged in after a failed logout
    // it will login and log back out again
    // if (await alreadyLoggedIn.isDisplayed()) {
    //   console.info('Fixing logout failure');
    //   await this.clickElement(continueButton);
    //   await this.logout();
    //   await this.clickNativeButtonWithText('Continue');
    //   // wait for log in page
    //   await this.switchContextBySignId(this.msSignInContextTitle);
    // }

    // click use another account if it is available
    if (await useAnotherAccount.isDisplayed()) {
      console.info('Logging in using another account');
      await this.clickElement(useAnotherAccount);
    }

    // set email
    console.log('/');
    await this.waitForExists(emailTextBox);
    console.log('/');
    await this.clickElement(emailTextBox);
    console.log('/');
    await emailTextBox.addValue(user.UserPrincipalName);
    // click next button
    console.log('/');
    const nextButton: WebdriverIO.Element = await $('#idSIButton9');
    console.log('/');
    await this.waitForExistAndClickable(nextButton);
    console.log('/');
    await this.clickElement(nextButton);
    // click password button
    console.log('/');
    const passwordBox = await $('#passwordInput');
    console.log('/');
    await this.waitForExistAndClickable(passwordBox);
    console.log('/');
    await this.clickElement(passwordBox);
    console.log('/');
    await passwordBox.setValue(user.Password);
    console.log('/');
    // click sign in
    const signInButton = await $('#submitButton');
    console.log('/');
    await this.waitForExistAndClickable(signInButton);
    console.log('/');
    await this.clickElement(signInButton);
    // click continue button
    console.log('/');
    await browser.pause(5000);
    console.log('/');
    await this.waitForClickables(continueButton);
    console.log('/');
    await this.clickElement(continueButton);
    // switch to Search app context
    console.log('/');
    await this.switchToDESContext();
    console.log('/');
    await browser.pause(3000);
  }

  async logout(): Promise<void> {
    console.log('>>>>>>>>>>>>>> LOGGING OUT <<<<<<<<<<<<<');
    await this.switchToDESContext();
    console.log('!!');
    await waitFor(this.ionMenuButton, '5000', false, 'be displayed');
    console.log('!!!');
    await clickElement('click', 'selector', this.ionMenuButton);
    console.log('!!!');
    await clickElement('click', 'selector', this.logoutButton);
    console.log('!!!!');
    await clickElementWithText('click', 'button', 'Logout');
    console.log('!!!!!!!');
    await this.switchToWindowLastInArray();
    // await driver.pause(5000);
    await this.gettingContextAndWindowHandles();
    // await driver.pause(5000);
    console.log('switchContextBySignId');
    await browser.getContexts();
    await this.switchContextBySignId(this.msSignOutContextTitle);
    console.log('!!!!!!!!');
    // LOOK HERE
    // const logoutTile = await $('#tilesHolder');
    // console.log('Pausing for 5 seconds');
    // await browser.pause(5000);
    // console.log('!!!!!!!!!');
    // await this.waitForExists(logoutTile);
    // console.log('!!!!!!!!!!');
    // await this.clickElement(logoutTile);
    console.log('>>>>>>>>>SIGNED OUT>>>>>>>>>');
    await browser.pause(5000);
    console.log('closing all windows');
    await this.closeAllWindows();
    console.log('>>>>>Terminating All Apps<<<<<');
    console.log('Terminating Safari');
    await browser.terminateApp('com.apple.mobilesafari');
    // await driver.activateApp('uk.gov.dvsa.drivingexaminerservices');
    await browser.terminateApp('uk.gov.dvsa.drivingexaminerservices');
    await browser.activateApp('uk.gov.dvsa.drivingexaminerservices');
    console.log('Activated App');
    // console.log('Logout completed and back in DES');
    // await this.switchToDESContext();
    // const signInAgainButton = await $('span=Sign in');
    // await this.clickElement(signInAgainButton);
  }
}

export default new LoginMobilePageObject();
