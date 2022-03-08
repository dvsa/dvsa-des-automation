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

    ///
    //THIS FUNCTION DOES NOT WORK
    ///
    // const screen = $('#legal-requirements-tick-NS');
    const screen = $($(elementSelector));


    this.switchToNativeContext();

    browser.pause(2000);

    browser.touchAction({
      action: 'longPress',
      element: screen
    });


    browser.pause(500)

  }
}

export default new ClickElementLongPageobject()
