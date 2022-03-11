import { Selector } from 'webdriverio';

import checkIfElementExists from '@shared-boilerplate/support/lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';
import { formatISO } from 'date-fns'

/**
 * Perform an click action on the given element
 * @param  {String}   selector Element selector
 */
export default async (
    hours: string,
    minutes: string,
    ampm: string,
    selector: string
) => {
    /**
     * Get the element selection strategy from the lookup 
     * @type {Selector}
     */
    const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);
    
    let h = parseInt(hours);
    let m = parseInt(minutes);

    if (ampm) {
        ampm = ampm.toUpperCase();
        if (ampm === "PM" && h < 12) h = h + 12;
        if (ampm === "AM" && h == 12) h = h - 12;
    }

    const timeToSet = formatISO(new Date(2020, 1, 1, h, m));

    checkIfElementExists(elementSelector);

    browser.executeScript(`document.querySelector(arguments[0]).value='${timeToSet}'`, [elementSelector]);

};
