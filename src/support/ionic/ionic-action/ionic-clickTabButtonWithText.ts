import { Selector } from 'webdriverio';

import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForAriaSelected from '../../lib/waitForAriaSelected';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 */
export default (
  action: 'click' | 'doubleClick',
  text: string,
) => {
  /**
     * The method to call on the browser object
     * @type {String}
     */
  const method = (action === 'click') ? 'click' : 'doubleClick';

  const elementSelector = `ion-tab-button.ion-activatable=${text}`;

  checkIfElementExists(elementSelector);
  $(elementSelector)[method]();
};
