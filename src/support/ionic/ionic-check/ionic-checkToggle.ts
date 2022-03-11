import checkIfElementExists from '@shared-boilerplate/support/lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Perform an click action on the given element
 * @param  {String}   parent  The parent item that contains the toggle
 * @param  {String}   type    Type of the element (ion-button or button)
 * @param  {String}   text    Text to select by
 */
export default (
    parent: string,
    text: string,
    status: 'on' | 'off'
) => {

    /**
     * Grab the selector for the parent object that was passed in
     * @type {string}
     */
    const parentSelector = PageObjectsHelper.elementPageFor(parent);

    /**
     * Construct the element selector for the ion-toggle with the name thats passed in
     */
    const elementSelector = `${parentSelector}//ion-toggle[@name='${text}']`

    checkIfElementExists(elementSelector);

    $(elementSelector).waitForClickable();

    const check = (status === 'on');
    const currentSetting = $(elementSelector).getAttribute('aria-checked') === 'true' ? true : false;

    
    expect(currentSetting).toBe(check);
}

