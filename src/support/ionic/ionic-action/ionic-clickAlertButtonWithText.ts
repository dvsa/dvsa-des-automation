import checkIfElementExists from '../../lib/checkIfElementExists';

/**
 * Perform an click action on the given element
 * @param  {String}   selector Element selector
 */
export default (
  text: string,
) => {
  /**
     * The method to call on the browser object
     * @type {String}
     */

  const alertElement = $('ion-alert');
  const buttonSelector = `button=${text}`;

  // Could have done it this way but WDIO is better for selecting text
  // const buttonSelector = `//ion-alert//button[contains(@class,'alert-button') and normalize-space(.)='${text}']`

  checkIfElementExists(alertElement);

  $(buttonSelector).click();
};
