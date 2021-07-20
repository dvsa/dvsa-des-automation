import waitUntilElementStopsMoving from '../../lib/waitUntilElementStopsMoving';
import checkIfElementExists from '../../lib/checkIfElementExists';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   selector Element selector
 */
export default (
    text: string
) => {
    /**
     * The method to call on the browser object
     * @type {String}
     */
    const method = 'click';
    const elementSelector = `//ion-action-sheet//button[@type='button' and contains(@class,'ion-activatable') and normalize-space(.)='${text}']`

    checkIfElementExists(elementSelector);
    waitUntilElementStopsMoving(elementSelector);

    $(elementSelector).click();

};