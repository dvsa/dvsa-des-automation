import { Selector } from 'webdriverio';

import { formatISO, format, parseISO } from 'date-fns';
import checkIfElementExists from '../../lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Perform an click action on the given element
 * @param  {String}   selector Element selector
 */
export default async (
  day: string,
  month: string,
  year: string,
  selector: string,
) => {
  /**
     * Get the element selection strategy from the lookup
     * @type {Selector}
     */
  const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

  checkIfElementExists(elementSelector);

  browser.executeScript(`document.querySelector(arguments[0]).innerText='${day}/${month}/${year}'`, [elementSelector]);
};
