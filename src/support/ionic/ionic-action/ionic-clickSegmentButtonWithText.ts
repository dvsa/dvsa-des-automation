import checkIfElementExists from '../../lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

/**
 * Perform an click action on the given element
 * @param  {String} selector Element selector
 */
export default (
  selector: string,
  text: string,
) => {
  const textSelector = `//ion-segment-button[normalize-space(.)='${text}']`;

  if (selector !== null) {
    const parentSelector = PageObjectsHelper.elementPageFor(selector);
    checkIfElementExists(parentSelector);
    const element = $(parentSelector).$(textSelector);
    element.click();
  } else {
    checkIfElementExists(textSelector);
    $(textSelector).click();
  }
};
