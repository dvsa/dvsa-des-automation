import { AppiumContext } from 'shared/models/appiumContext.model';
import scroll from '@shared-boilerplate/support/action/scroll';
import clickElement from '@shared-boilerplate/support/action/clickElement';
import clickElementWithText from '@shared-custom/support/action/clickElementWithText';

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
      // let contexts = [{ title: 'context 1', id: '123' }, { title: 'context 2', id: '4321' }];
      const contexts: AppiumContext[] = await driver.getContexts() as unknown as AppiumContext[];

      for (let i = 0; i < titles.length; i += 1) {
        const context = contexts.find(
          (currentContext: AppiumContext) => (currentContext.title === titles[i]),
        );

        // if (context) return context;
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
    async selectAndCloseIonSelectByText(elementSelector:string, elementText:string, modalCloseText:string) {
      await scroll(elementSelector);
      await clickElement('click', 'selector', elementSelector);
      await clickElementWithText('click', 'button', elementText);
      await clickElementWithText('click', 'element', modalCloseText);
    }
}
