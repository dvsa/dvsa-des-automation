import type { Selector } from 'webdriverio';

/**
 * Wait for the page transition to disappear in ionic apps
 * @param  {String}   selector      Element selector string
*/

export default (
  selector: Selector,
) => {
  browser.waitUntil(
    () => $(selector).getAttribute('aria-selected') === 'true',
    {
      timeout: 5000,
      timeoutMsg: 'Was not selected after 5s',
    },
  );
};
