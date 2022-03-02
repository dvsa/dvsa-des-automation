import { Selector } from 'webdriverio';

import waitForClickable from 'webdriverio/build/commands/element/waitForClickable';
import checkIfElementExists from '../../lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   selector Element selector
 */
export default (
  action: 'click' | 'doubleClick',
  type: 'link' | 'selector',
  selector: string,
) => {
  /**
     * Element to perform the action on
     * @type {String}
     */
  const elementSelector: Selector = (type === 'link') ? `=${selector}` : PageObjectsHelper.elementPageFor(selector);

  /**
     * The method to call on the browser object
     * @type {String}
     */
  const method = (action === 'click') ? 'click' : 'doubleClick';

  // checkIfElementExists(elementSelector);
  // waitForClickable(elementSelector);
  $(elementSelector).waitForDisplayed({ timeout: 15000, reverse: false, interval: 50 });
  $(elementSelector).waitForClickable({ timeout: 15000, reverse: false, interval: 50 });

  $(elementSelector)[method]();
  browser.pause(500);
  // browser.debug();
};
