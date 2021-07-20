import type { Selector } from 'webdriverio';

import checkIfElementExists from '../../lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';
import randomString from '../../lib/randomString';

/**
 * Set the value of the given input field to a new value or add a value to the
 * current selector value
 * @param  {String}   method  The method to use (add or set)
 * @param  {Number}   length  Number of Characters to generate
 * @param  {String}   string  Element selector 
 */
export default (method: string, length: number, selector: string) => {
    /**
     * The command to perform on the browser object (addValue or setValue)
     * @type {String}
     */
    const command = (method === 'add') ? 'addValue' : 'setValue';
    const elementSelector = PageObjectsHelper.elementPageFor(selector);

    let value = randomString(length);
    let checkValue = value;

    checkIfElementExists(elementSelector, false, 1);

    if (!value) {
        checkValue = '';
    }

    $(elementSelector)[command](checkValue);
};

