import { Then } from '@cucumber/cucumber';

import checkClass from '../../support/common/check/checkClass';
import checkContainsAnyText from '../../support/common/check/checkContainsAnyText';
import checkIsEmpty from '../../support/common/check/checkIsEmpty';
import checkContainsText from '../../support/common/check/checkContainsText';
import checkCookieContent from '../../support/common/check/checkCookieContent';
import checkCookieExists from '../../support/common/check/checkCookieExists';
import checkDimension from '../../support/common/check/checkDimension';
import { checkEqualsText } from '../../support/common/check/checkEqualsText';
import checkFocus from '../../support/common/check/checkFocus';
import checkInURLPath from '../../support/common/check/checkInURLPath';
import checkIsOpenedInNewWindow from
    '../../support/common/check/checkIsOpenedInNewWindow';
import checkModal from '../../support/common/check/checkModal';
import checkModalText from '../../support/common/check/checkModalText';
import checkNewWindow from '../../support/common/check/checkNewWindow';
import checkOffset from '../../support/common/check/checkOffset';
import checkProperty from '../../support/common/check/checkProperty';
import checkFontProperty from '../../support/common/check/checkFontProperty';
import checkSelected from '../../support/common/check/checkSelected';
import checkTitle from '../../support/common/check/checkTitle';
import checkTitleContains from '../../support/common/check/checkTitleContains';
import checkURL from '../../support/common/check/checkURL';
import checkURLPath from '../../support/common/check/checkURLPath';
import checkWithinViewport from '../../support/common/check/checkWithinViewport';
import compareText from '../../support/common/check/compareText';
import isEnabled from '../../support/common/check/isEnabled';
import isExisting from '../../support/common/check/isExisting';
import isVisible from '../../support/common/check/isDisplayed';
import { waitFor } from '../../support/common/action/waitFor';
import waitForVisible from '../../support/common/action/waitForDisplayed';
import checkIfElementExists from '../../support/lib/checkIfElementExists';

Then(
    /^I expect that the title is( not)* "([^"]*)?"$/,
    checkTitle
);

Then(
    /^I expect that the title( not)* contains "([^"]*)?"$/,
    checkTitleContains
);

Then(
    /^I expect that element "([^"]*)?" does( not)* appear exactly "([^"]*)?" times$/,
    checkIfElementExists
);

Then(
    /^I expect that element "([^"]*)?" is( not)* displayed$/,
    isVisible
);

Then(
    /^I expect that element "([^"]*)?" becomes( not)* displayed$/,
    waitForVisible
);

Then(
    /^I expect that element "([^"]*)?" is( not)* within the viewport$/,
    checkWithinViewport
);

Then(
    /^I expect that element "([^"]*)?" does( not)* exist$/,
    isExisting
);

Then(
    /^I expect that element "([^"]*)?"( not)* contains the same text as element "([^"]*)?"$/,
    compareText
);

Then(
    /^I expect that (button|element) "([^"]*)?"( not)* matches the text "([^"]*)?"$/,
    checkEqualsText
);

Then(
    /^I expect that (button|element|container) "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    checkContainsText
);

Then(
    /^I expect that (button|element|ionic-textbox) "([^"]*)?"( not)* contains any text$/,
    checkContainsAnyText
);

Then(
    /^I expect that (button|element) "([^"]*)?" is( not)* empty$/,
    checkIsEmpty
);

Then(
    /^I expect that the url is( not)* "([^"]*)?"$/,
    checkURL
);

Then(
    /^I expect that the path is( not)* "([^"]*)?"$/,
    checkURLPath
);

Then(
    /^I expect the url to( not)* contain "([^"]*)?"$/,
    checkInURLPath
);

Then(
    /^I expect that the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    checkProperty
);

Then(
    /^I expect that the font( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    checkFontProperty
);

Then(
    /^I expect that checkbox "([^"]*)?" is( not)* checked$/,
    checkSelected
);

Then(
    /^I expect that element "([^"]*)?" is( not)* selected$/,
    checkSelected
);

Then(
    /^I expect that element "([^"]*)?" is( not)* enabled$/,
    isEnabled
);

Then(
    /^I expect that cookie "([^"]*)?"( not)* contains "([^"]*)?"$/,
    checkCookieContent
);

Then(
    /^I expect that cookie "([^"]*)?"( not)* exists$/,
    checkCookieExists
);

Then(
    /^I expect that element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/,
    checkDimension
);

Then(
    /^I expect that element "([^"]*)?" is( not)* positioned at ([\d+.?\d*]+)px on the (x|y) axis$/,
    checkOffset
);

Then(
    /^I expect that element "([^"]*)?" (has|does not have) the class "([^"]*)?"$/,
    checkClass
);

Then(
    /^I expect a new (window|tab) has( not)* been opened$/,
    checkNewWindow
);

Then(
    /^I expect the url "([^"]*)?" is opened in a new (tab|window)$/,
    checkIsOpenedInNewWindow
);

Then(
    /^I expect that element "([^"]*)?" is( not)* focused$/,
    checkFocus
);

Then(
    /^I wait on element "([^"]*)?"(?: for (\d+)ms)*(?: to( not)* (be checked|be enabled|be selected|be displayed|contain a text|contain a value|exist))*$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },
    waitFor
);

Then(
    /^I expect that a (alertbox|confirmbox|prompt) is( not)* opened$/,
    checkModal
);

Then(
    /^I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "([^"]*)?"$/,
    checkModalText
);
