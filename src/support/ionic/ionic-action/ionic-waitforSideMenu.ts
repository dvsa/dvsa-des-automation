import waitUntilElementStopsMoving from '@shared-custom/support/lib/waitUntilElementStopsMoving';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Perform an click action on the given element
 * @param  {String}   selector Element selector
 */
export default (
  menuSelector: string,
  showhide: string,
) => {
  /**
     * The method to call on the browser object
     * @type {String}
     */

  const elementSelector = PageObjectsHelper.elementPageFor(menuSelector);

  waitUntilElementStopsMoving(elementSelector);
};
