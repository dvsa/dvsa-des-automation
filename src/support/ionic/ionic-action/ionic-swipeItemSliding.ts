import { Selector } from 'webdriverio';
import { RectReturn } from '@wdio/protocols/build/types';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Perform an click action on the given element
 * @param  {String}   selector Element selector
 */
export default (
  direction: ('left' | 'right'),
  selector: string,
) => {
  /**
     * The method to call on the browser object
     * @type {String}
     */

  // THIS IS NOT WORKING, YOU NEED TO BUILD THIS WITH mobile:swipe operations
  // SEE THE SEARCH TEST PACK FOR THE WAY TO MAKE IT WORK! LC 07/2021

  const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

  // Preset the direction to left anyway
  if (direction === 'right') {
    // Swipe Right
  } else {
    // Swipe Left
  }
};
