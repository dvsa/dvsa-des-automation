import { Selector } from 'webdriverio';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Clear a given input field (placeholder for WDIO's clearElement)
 * @param  {String}   selector Element selector
 */
export default (selector: string) => {
    const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

    $(elementSelector).clearValue();
};
