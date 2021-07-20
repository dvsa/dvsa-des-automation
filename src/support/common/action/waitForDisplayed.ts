import type { Selector } from 'webdriverio';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Wait for the given element to become visible
 * @param  {String}   falseCase     Whether or not to expect a visible or hidden state
 * @param  {String}   selector      Element selector
 *
 * @todo  merge with waitfor
 */
export default (falseCase: any, selector: string) => {
    /**
     * Maximum number of milliseconds to wait for
     * @type {Int}
     */
    const ms = 30000;

    const elementSelector:Selector = PageObjectsHelper.elementPageFor(selector);

    $(elementSelector).waitForExist({
        timeout: ms,
        reverse: Boolean(falseCase),
        interval: 100
    });

    $(elementSelector).waitForDisplayed({
        timeout: ms,
        reverse: Boolean(falseCase),
        interval: 100
    });
};
