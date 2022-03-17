import { formatISO, format, parseISO } from 'date-fns';
import * as globalelements from '../globalelements/globalelements.json';

import debug from '../lib/debug';

class PageObjectsHelper {
    private globalElementArray;

    constructor() {
      this.globalElementArray = globalelements;
    }

    /**
     * Convert an ISO datetime to a 12 hour time
     * Author : Lee Carter
     * @param theTime
     * @returns
     */
    isoTimeto12Hour(theTime: string): string {
      const time = theTime.slice(0, -1);
      return format(parseISO(time), 'h:mma');
    }

    // Purpose   : Coverts rgba value to hex
    // Author    : Lee Carter
    // Created   : Nov 2020
    // Notes     :
    rgb2hex(rgbstring: string) {
      const rgb = rgbstring.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      return (rgb && rgb.length === 4) ? `#${
        (`0${parseInt(rgbstring[1], 10).toString(16)}`).slice(-2)
      }${(`0${parseInt(rgbstring[2], 10).toString(16)}`).slice(-2)
      }${(`0${parseInt(rgbstring[3], 10).toString(16)}`).slice(-2)}` : '';
    }

    elementPageFor(elementName: string): string {
      let selector: string = elementName;

      // Bail out if nothing is passed in
      if (elementName === null) return '';

      // Did you mean the globalelementarray selector...?
      if (elementName.indexOf('::') > 0) {
        const [page, element] = elementName.split('::');

        if (this.globalElementArray[page]) {
          selector = (this.globalElementArray[page][0][element.toLowerCase()] || selector);
        }
      }

      return selector;
    }

    findContextWithIdStartingWith(id: string) {
      const regex = new RegExp(id, 'ig');
      const contexts = driver.getContexts();
      return contexts.find((context:any) => context.id != undefined && context.id.match(regex));
    }
}

export default new PageObjectsHelper();
