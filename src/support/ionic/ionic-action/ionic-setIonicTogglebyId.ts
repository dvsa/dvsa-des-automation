import checkIfElementExists from '../../lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';
import debug from '../../lib/debug';

/**
 * Perform an click action on the given element
 * @param  {String}   selector  The parent item that contains the toggle
 * @param  {String}   text    Text to select by
 */
export default (
  selector: string,
  status: 'on' | 'off' | 'yes' | 'no',
) => {
  /**
     * The method to call on the browser object
     * @type {String}
     */
  const method = 'click';

  /**
     * Grab the selector for the parent object that was passed in
     * @type {string}
     */
  const elementSelector = PageObjectsHelper.elementPageFor(selector);

  /**
     * Construct the element selector for the ion-toggle with the name thats passed in
     */
  const element = `//ion-toggle[@id='${elementSelector}']`;

  checkIfElementExists(element);

  $(element).waitForClickable();

  const setTo = (status === 'on' || status === 'yes');
  const isOn = $(element).getAttribute('aria-checked') === 'true';

  if (setTo !== isOn) {
    $(element)[method]();
  }
};
