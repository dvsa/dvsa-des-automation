import type { Selector } from 'webdriverio';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Check if the given elements contains text
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   selector       Element selector
 * @param  {String}   falseCase     Whether to check if the content contains
 *                                  text or not
 */
export default (
  elementType: 'element' | 'button' | 'ionic-textbox',
  selector: string,
  falseCase?: any,
) => {
  /**
     * The command to perform on the browser object
     * @type {String}
     */
  let command: 'getValue' | 'getText' = 'getValue';

  const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

  if (elementType === 'button') {
    command = 'getText';
  } else {
    command = 'getValue';
  }

  console.log('Get Value', $('#firstNameTextbox').getAttribute('value'));
  // Took the attribute check out because it wont work on the ionic textbox
  // if (elementType === 'button' || $(elementSelector).getAttribute('value') === null) {
  if (elementType === 'button') {
    command = 'getText';
  }

  /**
     * False case
     * @type {Boolean}
     */
  let boolFalseCase;

  /**
     * The text of the element
     * @type {String}
     */
  const text = $(elementSelector)[command]();

  if (typeof falseCase === 'undefined') {
    boolFalseCase = false;
  } else {
    boolFalseCase = Boolean(falseCase);
  }

  if (boolFalseCase) {
    expect(text).toBe('');
  } else {
    expect(text).not.toBe('');
  }
};
