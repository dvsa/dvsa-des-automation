
import type { Selector } from 'webdriverio';
import PageObjectsHelper from '../helpers/pageobjectHelper';

/**
 * Wait for the page transition to disappear in ionic apps
 * @param  {String}   selector      Element selector string
*/

export default (
    text: string,
    selector: string
) => {
    // Explicitly wait for the text to change on the element

    const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

    browser.waitUntil(function () {
        return $(elementSelector).getText() === text
    }, {
        timeout: 10000,
        timeoutMsg: 'expected text to be different after 10s'
    });
};
