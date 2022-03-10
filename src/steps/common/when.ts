import { When } from '@cucumber/cucumber';

import clearInputField from '@shared-boilerplate/support/action/clearInputField';
import clickElement from '@shared-boilerplate/support/action/clickElement';
import closeLastOpenedWindow from '@shared-boilerplate/support/action/closeLastOpenedWindow';
import deleteCookies from '@shared-boilerplate/support/action/deleteCookies';
import dragElement from '@shared-boilerplate/support/action/dragElement';
import focusLastOpenedWindow from '@shared-boilerplate/support/action/focusLastOpenedWindow';
import handleModal from '@shared-boilerplate/support/action/handleModal';
import moveTo from '@shared-boilerplate/support/action/moveTo';
import pause from '@shared-boilerplate/support/action/pause';
import pressButton from '@shared-boilerplate/support/action/pressButton';
import scroll from '@shared-boilerplate/support/action/scroll';
import selectOption from '@shared-boilerplate/support/action/selectOption';
import selectOptionByIndex from '@shared-boilerplate/support/action/selectOptionByIndex';
import setCookie from '@shared-boilerplate/support/action/setCookie';
import setInputField from '@shared-boilerplate/support/action/setInputField';
import setPromptText from '@shared-boilerplate/support/action/setPromptText';
import switchContext from '@shared-custom/support/action/switchContext';
import clickElementWithText from '@shared-custom/support/action/clickElementWithText';
import clickElementContainingPartialText from  '@shared-custom/support/action/clickElementContainingPartialText'
import setInputFieldWithRandom from '@shared-custom/support/action/setInputFieldWithRandom';
import dumpPageContents from '@shared-custom/support/action/dumpPageContents';




When(
    /^I dump the page contents$/,
    dumpPageContents
);

When(
    /^I switch to (web|native) context$/,
    switchContext
);

When(
    /^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/,
    clickElement
);

When(
    /^I (click|doubleclick) on the (button|ionic-button|ionic-item|ionic-popoveritem|element|ionic-list-button|ionic-label) with the text "([^"]*)?"$/,
    clickElementWithText
);

When(
    /^I (click|doubleclick) on the (button|ionic-button|ionic-item|ionic-popoveritem|element|ionic-list-button|ionic-label) containing text "([^"]*)?"$/,
    clickElementContainingPartialText
);


When(
    /^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/,
    setInputField
);

When(
    /^I (add|set) (\d+) random characters to the inputfield "([^"]*)?"$/,
    setInputFieldWithRandom
);

When(
    /^I clear the inputfield "([^"]*)?"$/,
    clearInputField
);

When(
    /^I drag element "([^"]*)?" to element "([^"]*)?"$/,
    dragElement
);

When(
    /^I pause for (\d+)ms$/,
    pause
);

When(
    /^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/,
    setCookie
);

When(
    /^I delete the cookie "([^"]*)?"$/,
    deleteCookies
);

When(
    /^I press "([^"]*)?"$/,
    pressButton
);

When(
    /^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/,
    handleModal
);

When(
    /^I enter "([^"]*)?" into the prompt$/,
    setPromptText
);

When(
    /^I scroll to element "([^"]*)?"$/,
    scroll
);

When(
    /^I close the last opened (window|tab)$/,
    closeLastOpenedWindow
);

When(
    /^I focus the last opened (window|tab)$/,
    focusLastOpenedWindow
);

When(
    /^I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"$/,
    selectOptionByIndex
);

When(
    /^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/,
    selectOption
);

When(
    /^I move to element "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/,
    moveTo
);
