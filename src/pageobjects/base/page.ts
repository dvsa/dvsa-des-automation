import { AppiumContext } from 'shared/models/appiumContext.model';
import scroll from '@shared-boilerplate/support/action/scroll';
import clickElement from '@shared-boilerplate/support/action/clickElement';
import clickElementWithText from '@shared-custom/support/action/clickElementWithText';
import GettingContext from '@shared-custom/support/lib/gettingContext';
import { getElementByReference } from '@shared-helpers/element-reference-helper';
import { Selector } from 'webdriverio';

export interface Context {
  id: string,
  title: string,
  url: string,
  bundleId: string,
}

export default class Page {
  title;

  constructor() {
    this.title = 'My Page';
  }

  open(path: string) {
    browser.url(path);
  }

  /** *
   * Purpose : Search for a context based on an array of context titles
   * Author  : Lee Carter
   */
  doesContextExistByArray(titles: string[], switchContext = false) {
    const contexts: AppiumContext[] = driver.getContexts() as unknown as AppiumContext[];

    let found = false;

    for (let i = 0; i < titles.length; i += 1) {
      const context = contexts.find(
        (currentContext: AppiumContext) => (currentContext.title === titles[i]),
      );

      if (context) {
        found = true;
        if (switchContext) driver.switchContext(context.id);
      }
    }

    return found;
  }

  /** *
   * Purpose : Switch to a context by an array of context titles
   * Author  : Lee Carter
   */
  async switchContextByTitleArray(titles: string[]) {
    const contexts: AppiumContext[] = await driver.getContexts() as unknown as AppiumContext[];

    for (let i = 0; i < titles.length; i += 1) {
      const context = contexts.find(
        (currentContext: AppiumContext) => (currentContext.title === titles[i]),
      );

      if (context) {
        driver.switchContext(context.id);
        return;
      }
    }
  }

  switchToNativeContext() {
    driver.switchContext('NATIVE_APP');
  }

  /**
   * Read an item from the local storage of the browser
   * @param item The name of the item you want to read from local storage
   */
  getLocalStorageItem(item: string) {
    return browser.execute(`return window.localStorage.getItem('${item}');`);
  }

  /**
   * Clear out the local storage for the current application
   */
  clearLocalStorage() {
    return browser.execute('return window.localStorage.clear();');
  }

  /**
   * Get the whole local storage object
   */
  getLocalStorageAll() {
    return browser.execute('return window.localStorage;');
  }

  /**
   * Scrolls and opens an element, Clicks and closes an element by text as well,
   * @param elementSelector - The id/xpath/element-reference of the element selector to open
   * @param elementText - The name of the element text to click on the modal/ion-select overlay
   * @param modalCloseText - The name of the element text to click on the modal/ion-select overlay
   */
  async selectAndCloseIonSelectByText(elementSelector: string, elementText: string, modalCloseText: string) {
    await scroll(elementSelector);
    await clickElement('click', 'selector', elementSelector);
    await clickElementWithText('click', 'button', elementText);
    await clickElementWithText('click', 'element', modalCloseText);
  }

  public async doesContextExist(contextTitle: string): Promise<boolean> {
    const contexts: AppiumContext[] = await driver.getContexts() as unknown as AppiumContext[];
    const doesContextExist: boolean = contexts.some(
      (currentContext) => (currentContext.title === contextTitle
        || currentContext.id === contextTitle),
    );
    return doesContextExist;
  }

  public async waitForContextToExist(contextTitle: string): Promise<void> {
    await driver.waitUntil(() => this.doesContextExist(contextTitle), {
      timeout: 10000,
      timeoutMsg: `timed out waiting for ${contextTitle} context`,
    });
  }

  async getContextByTitle(title: string): Promise<Context | null> {
    const contexts = await driver.getContexts() as unknown as Context[];
    return (contexts.find((context) => context.title === title) || null);
  }

  public async switchToDESContext(): Promise<void> {
    console.info('at start of switchToDESContext');
    await console.info('Contexts', await browser.getContexts());
    await this.waitForContextToExist('DVSA DES');
    console.info('Done Waiting for context to exist');
    const DESContext = await this.getContextByTitle('DVSA DES');
    console.info('Variable');
    // @ts-ignore
    await driver.switchContext(DESContext.id);
    console.info('Switched context');
  }

  /**
   * Inputs a letter from the IOS keyboard and after closes down the keyboard.
   * To use this you will have to click on input box element bring up the keyboard.
   * This function only allows one letter to be typed.
   *
   * @param letter - letter to be inputted into textbox
   */
  public static async keyboardClickLetter(letter: string) {
    const upercaseLetter = letter.toUpperCase();
    await driver.switchContext('NATIVE_APP');
    if (driver.isKeyboardShown()) {
      driver.hideKeyboard('pressKey', upercaseLetter, upercaseLetter);
    }
    await new GettingContext().switchToDVSAAppContext();
  }

  async clickElement(element: WebdriverIO.Element) {
    await browser.pause(500);
    await element.click();
  }

  /**
   * switches to native context and clicks button by text.
   * @param text - text to be clicked
   */
  public async clickNativeButtonWithText(text: string): Promise<void> {
    await this.waitForContextToExist('NATIVE_APP');
    await driver.switchContext('NATIVE_APP');
    const nativeButtonText = await $(`(//XCUIElementTypeButton[@name="${text}"])[last()]`);
    await browser.pause(3000);
    await this.clickElement(nativeButtonText);
  }

  async tapElement(selector: string): Promise<void> {
    const elementSelectorForLocation: string = getElementByReference(selector);
    const { x, y } = await (await $(elementSelectorForLocation)).getLocation();
    await driver.switchContext('NATIVE_APP');
    driver.touchPerform([
      {
        action: 'tap',
        options: {
          x: x + 10,
          y: y + 10,
        },
      },
    ]);
    await new GettingContext().switchToDVSAAppContext();
  }

  getFailureOpts(selector: Selector, action: 'exist' | 'displayed' | 'clickable' = 'exist', timeout: number = 15000) {
    const timeoutMsg = `${timeout / 1000}`;
    return {
      timeout,
      reverse: false,
      timeoutMsg: `Element with selector: ${selector} did not ${action} on page within ${timeoutMsg} seconds`,
    };
  }

  async waitForExist(element: WebdriverIO.Element): Promise<void> {
    const { selector } = element;
    await element.waitForExist(this.getFailureOpts(selector));
  }

  async waitForClickable(element: WebdriverIO.Element): Promise<void> {
    const { selector } = element;
    await element.waitForClickable(this.getFailureOpts(selector, 'clickable'));
  }

  async waitForDisplayed(element: WebdriverIO.Element): Promise<void> {
    const { selector } = element;
    await element.waitForDisplayed(this.getFailureOpts(selector, 'displayed'));
  }

  async waitForExistAndClickable(element: WebdriverIO.Element): Promise<void> {
    await this.waitForExist(element);
    await this.waitForClickable(element);
  }
}
