import type { Selector } from 'webdriverio';
import PageObjectsHelper from '../../support/helpers/pageobjectHelper';

/**
 * Check if the given elements contains text
 * @param  {String}   selector      Element selector string
 * @param  {String}   expectedText  The text to check against
 */
export default (
  selector: string,
  expectedText: string,
) => {
  const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

  /**
     * The expected text
     * @type {String}
     */
  const stringExpectedText = expectedText;

  /**
     * The element from the page
     * @type {Element}
     */
  const elem = $(elementSelector);

  elem.waitForDisplayed();

  /**
     * The text of the element
     * @type {String}
     */
  const text = elem.getText();

  console.log(text);
  console.log(text.replace(/\n/, ' '));

  // Clear any new lines found in the results to flatten the string
  expect(text.replace(/\n/, ' ')).toContain(stringExpectedText);
};
