import clickElement from '@shared-boilerplate/support/action/clickElement';
import clickElementWithText from '@shared-custom/support/action/clickElementWithText';
import waitFor from '@shared-boilerplate/support/action/waitFor';
import * as credentials from '../../../creds/credentials.json';
import Page from '../base/page';

class LoginMobilePageObject extends Page {
  private msSignInContextTitle: string = 'Sign in to your account';

  private msSignOutContextTitle: string = 'Sign out';

  get ionMenuButton() { return 'des-dashboard::menu-button-xpath'; }

  get ionMenuButtonID() { return 'des-dashboard::ion-menu-button'; }

  get logoutButton() { return 'des-dashboard::logout-button'; }

  async switchContextBySignId(contextTitle: string): Promise<void> {
    // wait for log in page

    await this.waitForContextToExist(contextTitle);
    const signingContext = await this.getContextByTitle(contextTitle);
    // @ts-ignore
    await driver.switchContext(signingContext.id);
  }

  async login(typeOfUser: string): Promise<void> {
    // pause on app launch
    await browser.pause(7000);
    const user = credentials.Environment.Dev[typeOfUser][0];
    const burgerMenu: WebdriverIO.Element = await $('#dashboard-burger-menu-btn');
    const loginError = await $('#loginSorry');

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
    const alreadyLoggedIn = await $('#appConfirmTitle');
    // resolve as soo as either 'use another account' or email input available
    await Promise.race([
      this.waitForExistAndClickable(continueButton),
      this.waitForExistAndClickable(useAnotherAccount),
      this.waitForExistAndClickable(emailTextBox),
      this.waitForExistAndClickable(alreadyLoggedIn),
    ]);

    // If the app is already logged in after a failed logout
    // it will log in and log back out again
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
    if (!await continueButton.isDisplayed()) {
      // click password button
      const passwordBox = await $('#passwordInput');
      await this.waitForExistAndClickable(passwordBox);
      await this.clickElement(passwordBox);
      await passwordBox.setValue(user.Password);
      // click sign in
      const signInButton = await $('#submitButton');
      await this.waitForExistAndClickable(signInButton);
      await this.clickElement(signInButton);
    }
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
    await waitFor(this.ionMenuButtonID, '10000', false, 'be clickable');
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
    const signInAgainButton = await $('//span[contains(text(), \'Sign in\')]');
    await this.clickElement(signInAgainButton);
  }
}

export default new LoginMobilePageObject();
