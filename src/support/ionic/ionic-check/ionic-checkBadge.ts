import type { Selector } from 'webdriverio';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Check if the given elements contains text
 * @param  {String}   selector Element selector
 * @param  {String}   expectedText  The text to check against
 */
export default (
  selector: string,
  expectedText: string,
) => {
  /**
     * The expected text
     * @type {String}
     */
  const stringExpectedText = expectedText;
  const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

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

  // Clear any new lines found in the results to flatten the string
  expect(text.replace(/\n/, ' ')).toContain(stringExpectedText);
};
