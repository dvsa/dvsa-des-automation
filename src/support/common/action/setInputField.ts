import type { Selector } from 'webdriverio';

import checkIfElementExists from '../../lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Set the value of the given input field to a new value or add a value to the
 * current selector value
 * @param  {String}   method  The method to use (add or set)
 * @param  {String}   value   The value to set the selector to
 * @param  {String}   string  Element selector
 */
export default (
  method: string,
  value: string,
  selector: string,
) => {
  /**
     * The command to perform on the browser object (addValue or setValue)
     * @type {String}
     */
  const command = (method === 'add') ? 'addValue' : 'setValue';
  const elementSelector = PageObjectsHelper.elementPageFor(selector);

  let checkValue = value;

  checkIfElementExists(elementSelector, false, 1);
  $(elementSelector).waitForDisplayed({ timeout: 15000, reverse: false, interval: 50 });

  // console.log('DEBUG>>>>',elementSelector);

  if (!value) {
    checkValue = '';
  }

  $(elementSelector)[command](checkValue);
};
