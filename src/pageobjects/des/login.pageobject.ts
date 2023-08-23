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

  // async waitForExist(element: WebdriverIO.Element): Promise<void> {
  //   const { selector } = element;
  //   console.log(`---===================================================--- waitForExist ${selector}`);
  //   await browser.pause(1000);
  //   await element.waitForExist({
  //     timeout: 15000,
  //     reverse: false,
  //     timeoutMsg: `Element with selector: ${selector} did not exist on page within 15 seconds`,
  //   });
  // }
  //
  // async waitForExistAndClickable(element: WebdriverIO.Element): Promise<void> {
  //   const { selector } = element;
  //   console.log(`---===================================================--- waitForExistAndClickable ${selector} (waitforDisplayed)`);
  //   await browser.pause(1000);
  //   await element.waitForDisplayed({
  //     timeout: 15000,
  //     reverse: false,
  //     timeoutMsg: `Element with selector: ${selector} did not exist on page within 15 seconds`,
  //   });
  //   await browser.pause(1000);
  //   console.log(`---===================================================--- waitForExistAndClickable ${selector} (waitForClickable)`);
  //   await element.waitForClickable({
  //     timeout: 15000,
  //     reverse: false,
  //     timeoutMsg: `Element with selector: ${selector} was not clickable on page within 15 seconds`,
  //   });
  // }
  //
  // async waitForClickable(element: WebdriverIO.Element): Promise<void> {
  //   const { selector } = element;
  //   console.log(`---===================================================--- waitForClickable ${selector}`);
  //   await browser.pause(1000);
  //   await element.waitForClickable({
  //     timeout: 15000,
  //     reverse: false,
  //     timeoutMsg: `Element with selector: ${selector} was not clickable on page within 15 seconds`,
  //   });
  // }

  async switchContextBySignId(contextTitle: string): Promise<void> {
    // wait for log in page
    await this.waitForContextToExist(contextTitle);
    const signingContext = await this.getContextByTitle(contextTitle);
    // @ts-ignore
    await driver.switchContext(signingContext.id);
  }

  async closeAllWindows(closeOldOnly: boolean = false): Promise<void> {
    const browserHandlesArray = await browser.getWindowHandles();
    await browser.switchToWindow(await browserHandlesArray[browserHandlesArray.length - 1]);
    if (closeOldOnly) {
      const index = browserHandlesArray.indexOf(`${await browser.getWindowHandle()}`);
      browserHandlesArray.splice(index, 1);
    }
    // eslint-disable-next-line no-plusplus
    for (let i = browserHandlesArray.length; i >= 1; --i) {
      await browser.switchToWindow(`WEBVIEW_${browserHandlesArray[i - 1]}`);
      await browser.closeWindow();
    }
    console.info('>>>>>>>>>> Closing all windows done <<<<<<<<<<');
  }

  async gettingContextAndWindowHandles(): Promise<void> {
    console.log(await browser.getContext());
    console.log(await browser.getContexts());
    console.log(await browser.getWindowHandle());
    console.log(await browser.getWindowHandles());
  }

  async login(typeOfUser: string): Promise<void> {
    // pause on app launch
    await browser.pause(7000);
    const user = credentials.Environment.Dev[typeOfUser][0];

    const burgerMenu: WebdriverIO.Element = await $('#dashboard-burger-menu-btn');

    const loginBackdrop = await $('#i0281');
    const loginError = await $('#loginSorry');

    await browser.pause(5000);
    await this.gettingContextAndWindowHandles();
    await this.switchToDESContext();
    console.log('Promise.Race At start of test');
    // check if already logged in on app launch.
    await Promise.race([
      this.waitForExistAndClickable(burgerMenu),
      this.waitForExists(loginBackdrop),
      this.waitForExists(loginError),
    ]);

    if (await loginError.isDisplayed()) {
      throw new Error('log in error');
    }

    if (await burgerMenu.isDisplayed()) {
      await this.logout();
    }

    await this.clickNativeButtonWithText('Continue');

    // wait for log in page
    await this.switchContextBySignId(this.msSignInContextTitle);

    // click 'use another account if clickable
    const continueButton = await $('input[value="Continue"]');
    const useAnotherAccount = await $('#otherTileText');
    const emailTextBox = await $('#i0116');
    const alreadyLoggedIn = await $('#idSIButton9');
    // resolve as soo as either 'use another account' or email input available
    console.log('Promise.Race inside login');
    await Promise.race([
      this.waitForExistAndClickable(continueButton),
      this.waitForExistAndClickable(useAnotherAccount),
      this.waitForExistAndClickable(emailTextBox),
      this.waitForExistAndClickable(alreadyLoggedIn),
    ]);

    // If the app is already logged in after a failed logout
    // it will login and log back out again
    if (await alreadyLoggedIn.isDisplayed()) {
      console.info('Fixing logout failure');
      await this.clickElement(continueButton);
      await this.logout();
      await this.clickNativeButtonWithText('Continue');
      // wait for log in page
      await this.switchContextBySignId(this.msSignInContextTitle);
    }

    // click use another account if it is available
    const useAnotherAccountButtonPresent = await useAnotherAccount.isDisplayed();
    if (useAnotherAccountButtonPresent) {
      console.info('Logging in using another account');
      await this.clickElement(useAnotherAccount);
    }

    // set email
    await this.waitForExistAndClickable(emailTextBox);
    await this.clickElement(emailTextBox);
    await emailTextBox.addValue(user.UserPrincipalName);
    // click next button
    const nextButton: WebdriverIO.Element = await $('#idSIButton9');
    await this.waitForExistAndClickable(nextButton);
    await this.clickElement(nextButton);
    // click password button
    const passwordBox = await $('#passwordInput');
    await this.waitForExistAndClickable(passwordBox);
    await this.clickElement(passwordBox);
    await passwordBox.setValue(user.Password);
    // click sign in
    const signInButton = await $('#submitButton');
    await this.waitForExistAndClickable(signInButton);
    await this.clickElement(signInButton);
    // click continue button
    await browser.pause(5000);
    await this.waitForClickables(continueButton);
    await this.clickElement(continueButton);
    // switch to Search app context
    await this.switchToDESContext();
    await browser.pause(3000);
  }

  async logout(): Promise<void> {
    console.log('>>>>>>>>>>>>>> LOGGING OUT <<<<<<<<<<<<<');
    await this.switchToDESContext();
    await waitFor(this.ionMenuButton, '5000', false, 'be displayed');
    await clickElement('click', 'selector', this.ionMenuButton);
    await clickElement('click', 'selector', this.logoutButton);
    await clickElementWithText('click', 'button', 'Logout');
    await this.clickNativeButtonWithText('Continue');
    await this.switchContextBySignId(this.msSignOutContextTitle);
    const logoutTile = await $('small=Signed in');
    await this.waitForExistAndClickable(logoutTile);
    await this.clickElement(logoutTile);
    await this.clickNativeButtonWithText('Cancel');
    console.log('>>>>>>>>>SIGNED OUT>>>>>>>>>');
    await this.switchToDESContext();
    const signInAgainButton = await $('span=Sign in');
    await this.clickElement(signInAgainButton);
  }
}

export default new LoginMobilePageObject();
