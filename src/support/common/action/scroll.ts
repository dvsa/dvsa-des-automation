import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Scroll the page to the given element
 * @param  {String}   selector Element selector
 */
export default (selector: string) => {
    const elementSelector = PageObjectsHelper.elementPageFor(selector);

    $(elementSelector).scrollIntoView();
};
