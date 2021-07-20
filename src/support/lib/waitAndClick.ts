import { Selector } from "webdriverio";

export default (elementSelector: Selector, timeout = { timeout: 3000 } ) => {
    $(elementSelector).waitForClickable(timeout);
    $(elementSelector).click();
};
