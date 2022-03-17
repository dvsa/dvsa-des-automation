import checkIfElementExists from '@shared-boilerplate/support/lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Perform an click action on the given element
 * @param  {String}   parent  The parent item that contains the toggle
 * @param  {String}   type    Type of the element (ion-button or button)
 * @param  {String}   text    Text to select by
 */
export default (
  text: string,
  selected: string,
) => {
  /**
     * Grab the selector for the parent object that was passed in
     * @type {string}
     */
  // const parentSelector = PageObjectsHelper.elementPageFor(parent);

  /**
     * Construct the element selector for the ion-checkbox with the name thats passed in
     */

  const elementSelector = `//*[normalize-space(text())='${text}']//parent::ion-item//ion-checkbox`;

  checkIfElementExists(elementSelector);

  $(elementSelector).waitForClickable();

  const currentSetting = $(elementSelector).getAttribute('aria-checked') === 'true';

  if (selected === 'be') {
    expect(currentSetting).toBe(true);
  } else {
    expect(currentSetting).not.toBe(true);
  }
};
