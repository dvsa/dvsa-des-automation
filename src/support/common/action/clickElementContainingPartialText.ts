import waitForExist from 'webdriverio/build/commands/element/waitForExist';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitUntilElementStopsMoving from '../../lib/waitUntilElementStopsMoving';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (ion-button or button)
 * @param  {String}   text    Text to select by
 */
export default (
    action: 'click' | 'doubleClick',
    type: 'button' | 'ionic-button' | 'ionic-popoveritem' | 'ionic-item' | 'element' | 'ionic-list-button' | 'ionic-label',
    text: string
) => {

    /**
     * The method to call on the browser object
     * @type {String}
     */
    const method = (action === 'click') ? 'click' : 'doubleClick';

    const elementSelector = {
        'button': `button*=${text}`,
        'ionic-button': `ion-button*=${text}`,
        'ionic-item': `ion-item*=${text}`,
        'ionic-label': `ion-card*=${text}`,
        'ionic-popoveritem': `//ion-select-popover//ion-item[normalize-space(.)*='${text}']`,
        'element': `//*[normalize-space(.)*='${text}']`,
        'ionic-list-button': `//ion-list//ion-label//*[contains(text(), '${text}')]//ancestor::button`
    }[type];

    // console.log(elementSelector);
    // checkIfElementExists(elementSelector);
    waitUntilElementStopsMoving(elementSelector);
    $(elementSelector).waitForDisplayed({ timeout: 15000, reverse: false, interval: 50 });

    $(elementSelector).waitForClickable({ timeout: 15000, reverse: false, interval: 50 });

    $(elementSelector)[method]();
};
