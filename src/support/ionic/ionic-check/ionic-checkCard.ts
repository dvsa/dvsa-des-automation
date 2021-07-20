import type { Selector } from 'webdriverio';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Check if the given elements contains text
 * @param  {String}   selector Element selector
 * @param  {String}   expectedText  The text to check against
 */
export default (
    selector: string,
    section: ("header" | "content"),
    checktype: ("contain" | "be"),
    expectedText: string
) => {

    let subElementSelector = '';

    /**
     * The expected text
     * @type {String}
     */
    const stringExpectedText = expectedText;
    let elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

    if (section === "header") {
        subElementSelector = `ion-card-title`;
    } else {
        subElementSelector = `ion-card-content`;
    }

    /**
     * The element from the page
     * @type {Element}
     */
    const elem = $(elementSelector).$(subElementSelector);

    elem.waitForDisplayed();

    /**
     * The text of the element
     * @type {String}
     */
    const text = elem.getText();

    if (checktype === "contain") {
        expect(text.replace(/\n/, ' ')).toContain(stringExpectedText);
    } else {
        expect(text.replace(/\n/, ' ')).toBe(stringExpectedText);
    }

};
