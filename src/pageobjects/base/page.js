"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scroll_1 = __importDefault(require("@shared-boilerplate/support/action/scroll"));
const clickElement_1 = __importDefault(require("@shared-boilerplate/support/action/clickElement"));
const clickElementWithText_1 = __importDefault(require("@shared-custom/support/action/clickElementWithText"));
const gettingContext_1 = __importDefault(require("@shared-custom/support/lib/gettingContext"));
class Page {
    title;
    constructor() {
        this.title = 'My Page';
    }
    async open(path) {
        await browser.url(path);
    }
    /** *
     * Purpose : Search for a context based on an array of context titles
     * Author  : Lee Carter
     */
    doesContextExistByArray(titles, switchContext = false) {
        const contexts = driver.getContexts();
        let found = false;
        for (let i = 0; i < titles.length; i += 1) {
            const context = contexts.find((currentContext) => (currentContext.title === titles[i]));
            if (context) {
                found = true;
                if (switchContext)
                    driver.switchContext(context.id);
            }
        }
        return found;
    }
    /** *
     * Purpose : Switch to a context by an array of context titles
     * Author  : Lee Carter
     */
    async switchContextByTitleArray(titles) {
        const contexts = await driver.getContexts();
        for (let i = 0; i < titles.length; i += 1) {
            const context = contexts.find((currentContext) => (currentContext.title === titles[i]));
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
    getLocalStorageItem(item) {
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
    async selectAndCloseIonSelectByText(elementSelector, elementText, modalCloseText) {
        await (0, scroll_1.default)(elementSelector);
        await (0, clickElement_1.default)('click', 'selector', elementSelector);
        await (0, clickElementWithText_1.default)('click', 'button', elementText);
        await (0, clickElementWithText_1.default)('click', 'element', modalCloseText);
    }
    async doesContextExist(contextTitle) {
        const contexts = await driver.getContexts();
        const doesContextExist = contexts.some((currentContext) => (currentContext.title === contextTitle
            || currentContext.id === contextTitle));
        return doesContextExist;
    }
    async waitForContextToExist(contextTitle) {
        await driver.waitUntil(() => this.doesContextExist(contextTitle), {
            timeout: 10000,
            timeoutMsg: `timed out waiting for ${contextTitle} context`,
        });
    }
    async getContextByTitle(title) {
        const contexts = await driver.getContexts();
        return (contexts.find((context) => context.title === title) || null);
    }
    async switchToDESContext() {
        await this.waitForContextToExist('DVSA DES');
        const DESContext = await this.getContextByTitle('DVSA DES');
        if (!DESContext) {
            throw new Error('DESContext is not defined');
        }
        await driver.switchContext(DESContext.id);
    }
    /**
     * Inputs a letter from the IOS keyboard and after closes down the keyboard.
     * To use this you will have to click on input box element bring up the keyboard.
     * This function only allows one letter to be typed.
     *
     * @param letter - letter to be inputted into textbox
     */
    static async keyboardClickLetter(letter) {
        const uppercaseLetter = letter.toUpperCase();
        await driver.switchContext('NATIVE_APP');
        const [isShown] = await Promise.all([driver.isKeyboardShown()]);
        if (isShown) {
            await driver.hideKeyboard('pressKey', uppercaseLetter, uppercaseLetter);
        }
        await new gettingContext_1.default().switchToDVSAAppContext();
    }
    async clickElement(element) {
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(500);
        await element.click();
    }
    /**
     * switches to native context and clicks button by text.
     * @param text - text to be clicked
     */
    async clickNativeButtonWithText(text) {
        await this.waitForContextToExist('NATIVE_APP');
        await driver.switchContext('NATIVE_APP');
        const nativeButtonText = await $(`(//XCUIElementTypeButton[@name="${text}"])[last()]`);
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(3000);
        await this.clickElement(nativeButtonText);
    }
}
exports.default = Page;
