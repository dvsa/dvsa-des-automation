import { Selector } from 'webdriverio';

import { formatISO } from 'date-fns';
import checkIfElementExists from '../../lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Perform an click action on the given element
 * @param  {String}   selector Element selector
 */
export default async (
  hours: string,
  minutes: string,
  ampm: string,
  selector: string,
) => {
  /**
     * Get the element selection strategy from the lookup
     * @type {Selector}
     */
  const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

  let h = parseInt(hours);
  const m = parseInt(minutes);

  if (ampm) {
    ampm = ampm.toUpperCase();
    if (ampm === 'PM' && h < 12) h += 12;
    if (ampm === 'AM' && h == 12) h -= 12;
  }

  const timeToSet = formatISO(new Date(2020, 1, 1, h, m));

  checkIfElementExists(elementSelector);

  browser.executeScript(`document.querySelector(arguments[0]).value='${timeToSet}'`, [elementSelector]);
};
