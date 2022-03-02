import waitForExist from 'webdriverio/build/commands/element/waitForExist';
import checkIfElementExists from '../../lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (ion-button or button)
 * @param  {String}   parent  The parent item that contains the toggle
 * @param  {String}   text    Text to select by
 */
export default (
  action: 'click' | 'doubleClick',
  type: 'button' | 'ionic-button' | 'ionic-popoveritem' | 'ionic-item' | 'ionic-segment' | 'element',
  parent: string,
  text: string,
) => {
  /**
    * Grab the selector for the parent object that was passed in
    * @type {string}
    */
  const parentSelector = PageObjectsHelper.elementPageFor(parent);

  /**
     * The method to call on the browser object
     * @type {String}
     */
  const method = (action === 'click') ? 'click' : 'doubleClick';

  const elementSelector = {
    button: `${parentSelector}//button=${text}`,
    'ionic-button': `${parentSelector}//ion-button=${text}`,
    'ionic-item': `${parentSelector}//ion-item=${text}`,
    'ionic-popoveritem': `${parentSelector}//ion-select-popover//ion-item[normalize-space(.)='${text}']`,
    'ionic-segment': `${parentSelector}//ion-segment-button[contains(normalize-space(.), '${text}')]`,
    element: `${parentSelector}//*[normalize-space(.)='${text}']`,
  }[type];

  $(elementSelector).waitForDisplayed({ timeout: 15000, reverse: false, interval: 50 });
  $(elementSelector).waitForClickable();
  $(elementSelector)[method]();
};
