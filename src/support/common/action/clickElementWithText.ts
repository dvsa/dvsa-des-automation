import waitForExist from 'webdriverio/build/commands/element/waitForExist';
import checkIfElementExists from '../../lib/checkIfElementExists';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (ion-button or button)
 * @param  {String}   text    Text to select by
 */
export default (
    action: 'click' | 'doubleClick',
    type: 'button' | 'ionic-button' | 'ionic-popoveritem' | 'ionic-item' | 'element',
    text: string
) => {

    /**
     * The method to call on the browser object
     * @type {String}
     */
    const method = (action === 'click') ? 'click' : 'doubleClick';

    const elementSelector = {
        'button': `button=${text}`,
        'ionic-button': `ion-button=${text}`,
        'ionic-item': `ion-item=${text}`,
        'ionic-popoveritem': `//ion-select-popover//ion-item[normalize-space(.)='${text}']`,
        'element': `//*[normalize-space(.)='${text}']`
    }[type];

    // console.log(elementSelector);
    // checkIfElementExists(elementSelector);

    $(elementSelector).waitForDisplayed({ timeout:15000, reverse: false, interval: 50 });
    $(elementSelector).waitForClickable();
    $(elementSelector)[method]();
};
