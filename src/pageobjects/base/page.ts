import PageObjectsHelper from '../../support/helpers/pageobjectHelper';
import { AppiumContext } from '../../support/models/appiumContext.model';

export default class Page {


    title;

    get databaseSpinner() { return this.getSelector('smc-general::db-spinner') }
    get searchingSpinner() { return this.getSelector('smc-general::searching-spinner') }
    get loadingSpinner() { return this.getSelector('smc-general::loading-spinner') }
    get pageTitle() { return this.getSelector('smc-general::pagetitle') }
    get ionicPageTitle() { return this.getSelector('smc-general::ionictitle') }


    constructor() {
        this.title = 'My Page'
    }

    getStrategy(elementName: string): string {
        return PageObjectsHelper.elementPageFor(elementName);
    }

    getSelector(elementName: string): WebdriverIO.Element {
        return $(PageObjectsHelper.elementPageFor(elementName));
    }

    open(path: string) {
        browser.url(path)
    }

    getLastContext() {
        const contexts = browser.getContexts();
        return contexts[contexts.length - 1];
    }

    async getContexts() {
        return driver.executeScript("mobile:getContexts");
    }

    async waitForContextToLeave(context: string) {
        try {
            await browser.waitUntil(() => {
                return this.doesContextExistByArray([context]);
            }, {
                timeout: 2000
            })
        } catch {

        }
    }

    /***
    * Purpose : Search for a context based on an array of context titles
    * Author  : Lee Carter
    */
    doesContextExistByArray(titles: string[], switchContext = false) {
        const contexts: AppiumContext[] = driver.getContexts() as unknown as AppiumContext[];

        let found = false;

        for (let i = 0; i < titles.length; i++) {
            var context = contexts.find((context: AppiumContext) => {
                return context.title === titles[i];
            });

            if (context) {
                found = true;
                if (switchContext) driver.switchContext(context.id);
            }
        }

        return found;
    }

    /***
    * Purpose : Switch to a context by an array of context titles
    * Author  : Lee Carter
    */
    switchContextByTitleArray(titles: string[]) {
        // let contexts = [{ title: 'context 1', id: '123' }, { title: 'context 2', id: '4321' }];
        const contexts: any = driver.getContexts();

        for (let i = 0; i < titles.length; i++) {
            var context = contexts.find((context: AppiumContext) => {
                return context.title === titles[i];
            });

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


    debugContexts() {
        const contexts: Array<any> = driver.getContexts();

        console.log('Available contexts', contexts);
    }

    switchContext(switchTo: string) {
        const contexts: Array<any> = driver.getContexts();

        console.log('Available contexts', contexts);

        if (switchTo == 'NATIVE') {
            // Switch to native
            driver.switchContext('NATIVE_APP');
        }
        else {
            // Switch to web
            driver.switchContext(contexts[contexts.length - 1].id);
        }
    }

    /**
     * Read an item from the local storage of the browser
     * @param item The name of the item you want to read from local storage
     */
    getLocalStorageItem(item: string) {
        return browser.execute("return window.localStorage.getItem('" + item + "');");
    }

    /**
     * Clear out the local storage for the current application
     */
    clearLocalStorage() {
        return browser.execute("return window.localStorage.clear();");
    }

    /**
     * Get the whole local storage object
     */
    getLocalStorageAll() {
        return browser.execute("return window.localStorage;");
    }
}
