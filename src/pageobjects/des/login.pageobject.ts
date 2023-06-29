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

  async waitForExist(element: WebdriverIO.Element): Promise<void> {
    const { selector } = element;
    await element.waitForExist({
      timeout: 15000,
      reverse: false,
      timeoutMsg: `Element with selector: ${selector} did not exist on page within 15 seconds`,
    });
  }

  async waitForExistAndClickable(element: WebdriverIO.Element): Promise<void> {
    const { selector } = element;
    await element.waitForDisplayed({
      timeout: 15000,
      reverse: false,
      timeoutMsg: `Element with selector: ${selector} did not exist on page within 15 seconds`,
    });
    await element.waitForClickable({
      timeout: 15000,
      reverse: false,
      timeoutMsg: `Element with selector: ${selector} was not clickable on page within 15 seconds`,
    });
  }

  async waitForClickable(element: WebdriverIO.Element): Promise<void> {
    const { selector } = element;
    await element.waitForClickable({
      timeout: 15000,
      reverse: false,
      timeoutMsg: `Element with selector: ${selector} was not clickable on page within 15 seconds`,
    });
  }

  async login(typeOfUser: string): Promise<void> {
    // pause on app launch
    console.info('Pausing for 7000 ms');
    await browser.pause(7000);
    console.info('7000ms pause done');
    const user = credentials.Environment.Dev[typeOfUser][0];

    const burgerMenu: WebdriverIO.Element = await $('ion-menu-button');

    const loginBackdrop = await $('.backdrop-no-scroll');
    const loginError = await $('#loginSorry');

    // check if already logged in on app launch.
    await Promise.race([
      this.waitForExistAndClickable(burgerMenu),
      this.waitForExist(loginBackdrop),
      this.waitForExist(loginError),
    ]);

    if (await loginError.isDisplayed()) {
      throw new Error('log in error');
    }

    if (await burgerMenu.isDisplayed()) {
      console.info('logging out');
      await this.logout();
    }

    // await this.clickNativeButtonWithText('Continue');

    // wait for log in page
    console.info('Wait for log in page');
    await this.waitForContextToExist(this.msSignInContextTitle);
    const signInContext = await this.getContextByTitle(this.msSignInContextTitle);
    // @ts-ignore
    await driver.switchContext(signInContext.id);
    console.info('switched context');

    // click 'use another account if clickable
    const continueButton = await $('input[value="Continue"]');
    const useAnotherAccount = await $('#otherTileText');
    const emailTextBox = await $('#i0116');
    // resolve as soo as either 'use another account' or email input available
    await Promise.race([
      this.waitForExistAndClickable(continueButton),
      this.waitForExistAndClickable(useAnotherAccount),
      this.waitForExistAndClickable(emailTextBox),
    ]);
    // click use another account if it is available
    const useAnotherAccountButtonPresent = await useAnotherAccount.isExisting();
    if (useAnotherAccountButtonPresent) {
      console.info('Clicking use another account');
      await this.clickElement(useAnotherAccount);
    }
    console.info('After if for Clicking use another account');
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
    await this.waitForClickable(continueButton);
    await this.clickElement(continueButton);
    // switch to Search app context
    await this.switchToDESContext();
    await browser.pause(3000);
  }

  async logout(): Promise<void> {
    console.log('>>>>>>>>>>>>>> LOGGING OUT <<<<<<<<<<<<<');
    await this.switchToDESContext();
    await waitFor(this.ionMenuButton, '10000', false, 'be displayed');
    await clickElement('click', 'selector', this.ionMenuButton);
    await clickElement('click', 'selector', this.logoutButton);
    await clickElementWithText('click', 'button', 'Logout');
    await this.clickNativeButtonWithText('Continue');
    await this.waitForContextToExist(this.msSignOutContextTitle);
    const signOutContext = await this.getContextByTitle(this.msSignOutContextTitle);
    // @ts-ignore
    await driver.switchContext(signOutContext.id);
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
