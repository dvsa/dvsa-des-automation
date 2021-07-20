import PageObjectsHelper from '../../support/helpers/pageobjectHelper';
import { AppiumContext } from '../../support/models/appiumContext.model';

export default class Page {


    title;

    get databaseSpinner() { return this.getSelector('//*[contains(text(), "Refreshing databases")]') }
    get searchingSpinner() { return this.getSelector('//*[contains(text(), "Searching")]') }

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

    doesContextExist(title: string) {
        const contexts: any = driver.getContexts();
        // const seachTitle = title.toUpperCase();
        let found = false;

        var data = contexts.find((context: AppiumContext) => {
            // console.log(context);
            return context.title === title;
        });

        if ( data ) found = true;

        return found;

    }

    /***
     * Switch to a context by the title of the page
     */
    switchContextByTitle(title:string){
        const contexts: any = driver.getContexts();        
        // const seachTitle = title.toUpperCase();
        
        var context = contexts.find((context: AppiumContext) => {
            return context.title === title;
        });

        driver.switchContext(context.id);
    }

    switchToNativeContext(){
        driver.switchContext('NATIVE_APP');
    }

    switchContext(switchTo: string) {
        const contexts: Array<any> = driver.getContexts();

        // console.log('Available contexts', contexts);

        if (switchTo == 'NATIVE') {
            // Switch to native
            driver.switchContext('NATIVE_APP');
        }
        else {
            // Switch to web
            driver.switchContext(contexts[contexts.length - 1].id);
        }
    }
}