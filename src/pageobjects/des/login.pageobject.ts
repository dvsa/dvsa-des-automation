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

  // @TODO will be needed when log out added
  // private _msSignOutContextTitle: string = 'Sign out';
  private _desAppContextTitle: string = 'Ionic App';

  async doesContextExist(contextTitle: string): Promise<boolean> {
    const contexts: AppiumContext[] = await driver.getContexts() as unknown as AppiumContext[];
    console.log(`Apium Contexts : ${contexts}`);
    const doesContextExist: boolean = contexts.some((context) => context.title === contextTitle || context.id === contextTitle);
    console.log(`context ${contextTitle} exists: ${doesContextExist}`);
    return doesContextExist;
  }

  async waitForContextToExist(contextTitle: string): Promise<void> {
    console.log(`waiting for context ${contextTitle}`);
    await driver.waitUntil(async () => this.doesContextExist(contextTitle), {
      timeout: 10000,
      timeoutMsg: `timed out waiting for ${contextTitle} context`,
    });
  }

  async waitForExistAndClickable(element: WebdriverIO.Element): Promise<void> {
    const { selector } = element;
    await element.waitForExist({
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

  getRandomUserType(userType:string) {
    console.log(userType);
    const totalUsers = credentials.Environment.Dev.Super.length;
    console.log('total users of type:', totalUsers);
    const randomUserId = Math.floor(Math.random() * totalUsers) || 1;
    return credentials.Environment.Dev.Super[randomUserId - 1];
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

  async login(providedUser?: string): Promise<void> {
    // pause on app launch
    await browser.pause(2000);
    let user = this.getSuperUser();

    if (providedUser) {
      user = this.getRandomUserType(providedUser);
    }

    const nativeContinueButton = await $('//XCUIElementTypeButton[@name="Continue"]');
    await this.clickNativeButton(nativeContinueButton);

    // wait for log in page
    await this.waitForContextToExist(this._msSignInContextTitle);
    const signInContext = await this.getContextByTitle(this._msSignInContextTitle);
    // @ts-ignore
    await driver.switchContext(signInContext.id);
    console.log('switched context to sign in');

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
    // logout if already logged in and start again
    const continueButtonPresent = await continueButton.isExisting();
    if (continueButtonPresent) {
      // @TODO - build log out and back in if already logged in
      // await this.waitForExistAndClickable(continueButton);
      // await this.clickElement(continueButton);
      // await this.switchToDESContext();
      // await this.logout();
      // await this.login();
      // return Promise.resolve();
    }
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
    console.log('clicked next button');

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
    await browser.pause(2000);
    await this.waitForClickable(continueButton);
    await this.clickElement(continueButton);
    // switch to Search app context
    await this.switchToDESContext();
    await browser.pause(3000);
    // return Promise.resolve();
  }

  async logout(): Promise<void> {
    // @TODO - build log out
  }
}

export default new LoginMobilePageObject();
