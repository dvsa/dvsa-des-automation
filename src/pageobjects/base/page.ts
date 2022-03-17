import { AppiumContext } from 'shared/models/appiumContext.model';

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

      for (let i = 0; i < titles.length; i++) {
        const context = contexts.find((context: AppiumContext) => context.title === titles[i]);

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
    switchContextByTitleArray(titles: string[]) {
      // let contexts = [{ title: 'context 1', id: '123' }, { title: 'context 2', id: '4321' }];
      const contexts: any = driver.getContexts();

      for (let i = 0; i < titles.length; i++) {
        const context = contexts.find((context: AppiumContext) => context.title === titles[i]);

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
}
