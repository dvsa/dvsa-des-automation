import type { Selector } from 'webdriverio';

/**
 * Check if the given elements contains text
 * @param  {String}   expectedText  The text to check against
 */
export default (
  expectedText: string,
) => {
  /**
     * The expected text
     * @type {String}
     */
  const stringExpectedText = expectedText;
  const elementSelector: Selector = 'ion-toast';

  /**
     * The element from the page
     * @type {Element}
     */
  // const elem = $(elementSelector).shadow$('.toast-message');
  const elem = $(elementSelector).$('>>>.toast-message');

  elem.waitForDisplayed();

  /**
     * The text of the element
     * @type {String}
     */
  const text = elem.getText();
  // const text2 = browser.executeScript(`return document.querySelector('ion-toast').shadowRoot.querySelector('.toast-message').innerText`, []);

  console.log(text);

  // Clear any new lines found in the results to flatten the string
  expect(text.replace(/\n/, ' ')).toContain(stringExpectedText);
  browser.pause(200);
};
