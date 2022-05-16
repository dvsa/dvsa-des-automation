/* eslint-disable no-underscore-dangle */
import { AppiumContext } from 'shared/models/appiumContext.model';
import * as credentials from '../../../creds/credentials.json';

export interface Context {
  id: string,
  title: string,
  url: string,
  bundleId: string,
}

class LoginMobilePageObject {
  private _msSignInContextTitle: string = 'Sign in to your account';

  private _msSignOutContextTitle: string = 'Sign out';

  // @TODO will be needed when log out added
  // private _msSignOutContextTitle: string = 'Sign out';
  private _desAppContextTitle: string = 'DVSA DES';

  async doesContextExist(contextTitle: string): Promise<boolean> {
    const contexts: AppiumContext[] = await driver.getContexts() as unknown as AppiumContext[];
    const doesContextExist: boolean = contexts.some(
      (currentContext) => (currentContext.title === contextTitle
        || currentContext.id === contextTitle),
    );
    return doesContextExist;
  }

  async waitForContextToExist(contextTitle: string): Promise<void> {
    await driver.waitUntil(() => this.doesContextExist(contextTitle), {
      timeout: 10000,
      timeoutMsg: `timed out waiting for ${contextTitle} context`,
    });
  }

  async waitForExist(element: WebdriverIO.Element): Promise<void> {
    const { selector } = element;
    await element.waitForExist({
      timeout: 15000,
      reverse: false,
      // eslint-disable-next-line max-len
      timeoutMsg: `Element with selector: ${selector} did not exist on page within 15 seconds`,
    });
  }

  async waitForExistAndClickable(element: WebdriverIO.Element): Promise<void> {
    const { selector } = element;
    await element.waitForDisplayed({
      timeout: 15000,
      reverse: false,
      // eslint-disable-next-line max-len
      timeoutMsg: `Element with selector: ${selector} did not exist on page within 15 seconds`,
    });
    await element.waitForClickable({
      timeout: 15000,
      reverse: false,
      // eslint-disable-next-line max-len
      timeoutMsg: `Element with selector: ${selector} was not clickable on page within 15 seconds`,
    });
  }

  async waitForClickable(element: WebdriverIO.Element): Promise<void> {
    const { selector } = element;
    await element.waitForClickable({
      timeout: 15000,
      reverse: false,
      // eslint-disable-next-line max-len
      timeoutMsg: `Element with selector: ${selector} was not clickable on page within 15 seconds`,
    });
  }

  async clickNativeButton(element: WebdriverIO.Element): Promise<void> {
    await this.waitForContextToExist('NATIVE_APP');
    await driver.switchContext('NATIVE_APP');
    await browser.pause(3000);
    await this.clickElement(element);
  }

  async getContextByTitle(title: string): Promise<Context | null> {
    const contexts = await driver.getContexts() as unknown as Context[];
    return (contexts.find((context) => context.title === title) || null);
  }

  getSuperUser() {
    return credentials.Environment.Dev.Super[0];
  }

  getUserType(userType: string) {
    return credentials.Environment.Dev[userType][0];
  }

  async clickElement(element: WebdriverIO.Element) {
    await browser.pause(500);
    await element.click();
  }

  async switchToDESContext(): Promise<void> {
    await this.waitForContextToExist(this._desAppContextTitle);
    const DESContext = await this.getContextByTitle(this._desAppContextTitle);
    // @ts-ignore
    await driver.switchContext(DESContext.id);
  }

  async login(typeOfUser: string): Promise<void> {
    // pause on app launch
    await browser.pause(2000);
    const user = credentials.Environment.Dev[typeOfUser][0];

    const burgerMenu: WebdriverIO.Element = await $('ion-menu-button');

    const nativeContinueButton = await $('//XCUIElementTypeButton[@name="Continue"]');
    const loginBackdrop = await $('.backdrop-no-scroll');
    const loginError = await $('#loginSorry');

    // check if already logged in on app launch.
    await Promise.race([
      this.waitForExist(burgerMenu),
      this.waitForExist(loginBackdrop),
      this.waitForExist(loginError),
    ]);

    if (await loginError.isExisting()) {
      throw new Error('log in error');
    }

    if (await burgerMenu.isExisting()) {
      await this.logout();
    }

    await this.clickNativeButton(nativeContinueButton);

    // wait for log in page
    await this.waitForContextToExist(this._msSignInContextTitle);
    const signInContext = await this.getContextByTitle(this._msSignInContextTitle);
    // @ts-ignore
    await driver.switchContext(signInContext.id);

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
    await this.waitForClickable(continueButton);
    await this.clickElement(continueButton);
    // switch to Search app context
    await this.switchToDESContext();
    await browser.pause(3000);
  }

  async logout(): Promise<void> {
    const burgerMenu: WebdriverIO.Element = await $('ion-menu-button');
    await this.switchToDESContext();
    const logout = await $('#logout');
    const logOutConfirmButton = await $('button=Logout');
    await this.waitForExistAndClickable(burgerMenu);
    await this.clickElement(burgerMenu);
    await this.waitForExistAndClickable(logout);
    await this.clickElement(logout);
    await this.waitForExistAndClickable(logOutConfirmButton);
    await this.clickElement(logOutConfirmButton);
    // click native continue
    const nativeContinueButton = await $('//XCUIElementTypeButton[@name="Continue"]');
    await this.clickNativeButton(nativeContinueButton);
    // wait for MS sign out page
    await this.waitForContextToExist(this._msSignOutContextTitle);
    const signOutContext = await this.getContextByTitle(this._msSignOutContextTitle);
    // switch to sign out page context
    // @ts-ignore
    await driver.switchContext(signOutContext.id);

    const logOutSuccessText = await $('#login_workload_logo_text');
    const logoutTile = await $('small=Signed in');
    // const signOutSuccessful = await $('div=You have successfully signed out');

    await Promise.race([
      this.waitForExist(logOutSuccessText),
      this.waitForExist(logoutTile),
    ]);

    if (await logoutTile.isExisting()) {
      const signOutSuccessful = await $('#instruction');
      // click account sign out tile
      await this.waitForExistAndClickable(logoutTile);
      await this.clickElement(logoutTile);
      await this.waitForExist(signOutSuccessful);
    }

    const nativeCancelButton = await $('//XCUIElementTypeButton[@name="Cancel"]');
    await this.clickNativeButton(nativeCancelButton);
    await this.switchToDESContext();
    const signInAgainButton = await $('span=Sign in');
    await this.clickElement(signInAgainButton);
  }
}

export default new LoginMobilePageObject();
