import Page from '../base/page'
import { Selector } from 'webdriverio';
import PageObjectsHelper from '../../support/helpers/pageobjectHelper'


class ClickElementLongPageobject extends Page {

  clickElementLong(
    type: 'link' | 'selector',
    selector: string
  ) {

    const elementSelector: Selector = (type === 'link') ? `=${selector}` : PageObjectsHelper.elementPageFor(selector);

    $(elementSelector).waitForDisplayed({ timeout:15000, reverse: false, interval: 50,timeoutMsg:`Elemennt ${elementSelector} was not displayed within 15 seconds` });
    $(elementSelector).waitForClickable({ timeout:15000, reverse: false, interval: 50,timeoutMsg:`Elemennt ${elementSelector} was not clickable within 15 seconds`  });

     // simple touch action on element
    // browser.touchAction({
    //   { action: 'longPress' },
    //   element: elementSelector
    // });

    // browser.touchAction(`${elementSelector}`, 'longPress');
    //
    // elementSelector.touchAction('longPress');

    // driver.touchAction([
    //   {
    //     action: 'longPress',
    //     element: elementSelector
    //   }]
    // });

    // this.switchToNativeContext();

    this.switchContext("NATIVE");

    browser.touchPerform([{
      action: 'longPress',
      options: {
        element: elementSelector, // json web element was queried before
      }
    }]);

    browser.pause(500)

  }
}

export default new ClickElementLongPageobject()
