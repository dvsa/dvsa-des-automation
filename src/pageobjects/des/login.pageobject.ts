/* eslint-disable no-underscore-dangle */
import { waitUntil } from 'async-wait-until';

import * as credentials from '../../../creds/credentials.json';
import { AppiumContext } from '../../support/models/appiumContext.model';

export interface Context {
  id: string,
  title: string,
  url: string,
  bundleId: string,
}

class LoginMobilePageObject {

  private _msSignInContextTitle: string = 'Sign in to your account';
  private _msSignOutContextTitle: string = 'Sign out';
  private _desAppContextTitle: string = 'Ionic App';

  async doesContextExist(contextTitle: string): Promise<boolean> {
    const contexts: AppiumContext[] = await driver.getContexts() as unknown as AppiumContext[];
    console.log(contexts);
    console.log(`context ${contextTitle} exists: ${contexts.some((context) => context.title === contextTitle) || contexts.some((context) => context.id === contextTitle)}`)
    return contexts.some((context) => context.title === contextTitle) || contexts.some((context) => context.id === contextTitle);
  }

  async waitForContextToExist(contextTitle: string): Promise<void> {
    console.log(`waiting for context ${contextTitle}`)
    // await waitUntil(async () => { return this.doesContextExist(contextTitle) }, { timeout: 15000 })
    await driver.waitUntil(async () => this.doesContextExist(contextTitle), {
      timeout: 10000,
      timeoutMsg: `timed out waiting for ${contextTitle} context`
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
    console.log(userType)
    const totalUsers = credentials.Environment.Dev.Super.length;
    console.log("total users of type:", totalUsers);
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

    // @TODO - reinstate this once getRandomUserType method fixed
    // if (providedUser) {
    //     user = this.getRandomUserType(providedUser);
    // }

    // determine if already logged in or new log in
    const nativeContinueButton = await $('//XCUIElementTypeButton[@name="Continue"]');

    // @TODO - log in currently only works if not already logged in (appium capability fullReset: true).
    //  Need to get the log out if already logged in flow working

    // const dashboardButton = await $('#go-to-journal-button');
    // await Promise.race([
    //     this.waitForExistAndClickable(nativeContinueButton),
    //     this.waitForExistAndClickable(dashboardButton),
    // ]);
    //
    // if (await dashboardButton.isExisting()) {
    //     console.log('<<<<<<<<<<<<<<ALREADY LOGGED IN >>>>>>>>>>>>>>')
    //     await this.logout();
    // }

    await this.clickNativeButton(nativeContinueButton);
    console.log('clicked native continue')

    // wait for log in page
    await this.waitForContextToExist(this._msSignInContextTitle);
    const signInContext = await this.getContextByTitle(this._msSignInContextTitle);
    // @ts-ignore
    await driver.switchContext(signInContext.id);
    console.log('switched context to sign in')

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
    console.log('promise.race done')
    // logout if already logged in and start again
    const continueButtonPresent = await continueButton.isExisting();
    // if (continueButtonPresent) {
    //   await this.waitForExistAndClickable(continueButton);
    //   await this.clickElement(continueButton);
    //   await this.switchToDESContext();
    //   await this.logout();
    //   await this.login();
    //   return Promise.resolve();
    // }
    // click use another account if it is available
    const useAnotherAccountButtonPresent = await useAnotherAccount.isExisting();
    if (useAnotherAccountButtonPresent) {
      await this.clickElement(useAnotherAccount);
    }
    // set email
    await this.waitForExistAndClickable(emailTextBox);
    await this.clickElement(emailTextBox);
    console.log('clicked email box')
    await emailTextBox.addValue(user.UserPrincipalName);
    // click next button
    const nextButton: WebdriverIO.Element = await $('#idSIButton9');
    await this.waitForExistAndClickable(nextButton);
    await this.clickElement(nextButton);
    console.log('clicked next button')

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
    return Promise.resolve();
  }

  async logout(): Promise<void> {
    await browser.pause(2000);
    // click burger menu
    const burgerMenu = await $('#menuButton');
    await this.waitForExistAndClickable(burgerMenu);
    await this.clickElement(burgerMenu);
    console.log('burger menu');
    // click log out
    const logout = await $('#logOut');
    await this.waitForExistAndClickable(logout);
    await this.clickElement(logout);
    // click confirm
    const yesConfirmButton = await $('span=YES');
    await this.waitForExistAndClickable(yesConfirmButton);
    await this.clickElement(yesConfirmButton);
    // click native continue
    const nativeContinueButton = await $('//XCUIElementTypeButton[@name="Continue"]');
    await this.clickNativeButton(nativeContinueButton);
    // wait for MS sign out page
    await this.waitForContextToExist(this._msSignOutContextTitle);
    const signOutContext = await this.getContextByTitle(this._msSignOutContextTitle);
    // switch to sign out page context
    // @ts-ignore
    await driver.switchContext(signOutContext.id);
    // click account sign out tile
    const logoutTile = await $("small=Signed in");
    await this.waitForExistAndClickable(logoutTile);
    await this.clickElement(logoutTile);
    await browser.pause(3000);
    const nativeCancelButton = await $('//XCUIElementTypeButton[@name="Cancel"]');
    await this.clickNativeButton(nativeCancelButton);
  }
}

export default new LoginMobilePageObject();
