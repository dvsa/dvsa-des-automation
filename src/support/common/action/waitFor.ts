import type { Selector } from 'webdriverio';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

type WaitForCommands = 'waitForClickable' | 'waitForDisplayed' | 'waitForEnabled' | 'waitForExist';

/**
 * Wait for the given element to be enabled, displayed, or to exist
 * @param  {String}   selector                  Element selector
 * @param  {String}   ms                       Wait duration (optional)
 * @param  {String}   falseState               Check for opposite state
 * @param  {String}   state                    State to check for (default
 *                                             existence)
 */
export default (
  selector: string,
  ms: string,
  falseState: boolean,
  state: string,
) => {
  /**
     * Maximum number of milliseconds to wait, default 3000
     * @type {Int}
     */
  const intMs = parseInt(ms, 10) || 3000;

  /**
     * Command to perform on the browser object
     * @type {String}
     */
  let command: WaitForCommands = 'waitForExist';

  /**
     * Boolean interpretation of the false state
     * @type {Boolean}
     */
  let boolFalseState = !!falseState;

  /**
     * Parsed interpretation of the state
     * @type {String}
     */
  let parsedState = '';

  if (falseState || state) {
    parsedState = state.indexOf(' ') > -1
      ? state.split(/\s/)[state.split(/\s/).length - 1]
      : state;

    if (parsedState) {
      command = `waitFor${parsedState[0].toUpperCase()}`
                + `${parsedState.slice(1)}` as WaitForCommands;
    }
  }

  if (typeof falseState === 'undefined') {
    boolFalseState = false;
  }

  const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

  $(elementSelector)[command]({
    timeout: intMs,
    reverse: boolFalseState,
  });
};
