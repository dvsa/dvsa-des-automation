import { Given } from '@cucumber/cucumber';

import checkContainsAnyText from '../../support/common/check/checkContainsAnyText';
import checkIsEmpty from '../../support/common/check/checkIsEmpty';
import checkContainsText from '../../support/common/check/checkContainsText';
import checkCookieContent from '../../support/common/check/checkCookieContent';
import checkCookieExists from '../../support/common/check/checkCookieExists';
import checkDimension from '../../support/common/check/checkDimension';
import checkElementExists from '../../support/common/check/checkElementExists';
import checkEqualsText from '../../support/common/check/checkEqualsText';
import checkModal from '../../support/common/check/checkModal';
import checkOffset from '../../support/common/check/checkOffset';
import checkProperty from '../../support/common/check/checkProperty';
import checkSelected from '../../support/common/check/checkSelected';
import checkTitle from '../../support/common/check/checkTitle';
import checkUrl from '../../support/common/check/checkURL';
import closeAllButFirstTab from '@boilerplate-actions/closeAllButFirstTab';
import compareText from '../../support/common/check/compareText';
import isEnabled from '../../support/common/check/isEnabled';
import isDisplayed from '../../support/common/check/isDisplayed';
import openWebsite from '@boilerplate-actions/openWebsite';
import setWindowSize from '@boilerplate-actions/setWindowSize';
import waitForDisplayed from '@boilerplate-actions/waitForDisplayed';

Given(
    /^I open the (url|site) "([^"]*)?"$/,
    openWebsite
);

Given(
    /^The app is( not)* loaded using "([^"]*)?"$/,
    waitForDisplayed
);

Given(
    /^The app has rendered$/,
    // @TODO - do we need this. Seems to do nothing
    () => {}
);

Given(
    /^the element "([^"]*)?" is( not)* displayed$/,
    isDisplayed
);

Given(
    /^the element "([^"]*)?" is( not)* enabled$/,
    isEnabled
);

Given(
    /^the element "([^"]*)?" is( not)* selected$/,
    checkSelected
);

Given(
    /^the checkbox "([^"]*)?" is( not)* checked$/,
    checkSelected
);

Given(
    /^there is (an|no) element "([^"]*)?" on the page$/,
    checkElementExists
);

Given(
    /^the title is( not)* "([^"]*)?"$/,
    checkTitle
);

Given(
    /^the element "([^"]*)?" contains( not)* the same text as element "([^"]*)?"$/,
    compareText
);

Given(
    /^the (button|element) "([^"]*)?"( not)* matches the text "([^"]*)?"$/,
    checkEqualsText
);

Given(
    /^the (button|element|container) "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    checkContainsText
);

Given(
    /^the (button|element) "([^"]*)?"( not)* contains any text$/,
    checkContainsAnyText
);

Given(
    /^the (button|element) "([^"]*)?" is( not)* empty$/,
    checkIsEmpty
);

Given(
    /^the page url is( not)* "([^"]*)?"$/,
    checkUrl
);

Given(
    /^the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    checkProperty
);

Given(
    /^the cookie "([^"]*)?" contains( not)* the value "([^"]*)?"$/,
    checkCookieContent
);

Given(
    /^the cookie "([^"]*)?" does( not)* exist$/,
    checkCookieExists
);

Given(
    /^the element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/,
    checkDimension
);

Given(
    /^the element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis$/,
    checkOffset
);

Given(
    /^I have a screen that is ([\d]+) by ([\d]+) pixels$/,
    setWindowSize
);

Given(
    /^I have closed all but the first (window|tab)$/,
    closeAllButFirstTab
);

Given(
    /^a (alertbox|confirmbox|prompt) is( not)* opened$/,
    checkModal
);
