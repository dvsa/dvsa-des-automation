import { When } from '@cucumber/cucumber';

import clearInputField from '@boilerplate-actions/clearInputField';
import clickElement from '@boilerplate-actions/clickElement';
import closeLastOpenedWindow from '@boilerplate-actions/closeLastOpenedWindow';
import deleteCookies from '@boilerplate-actions/deleteCookies';
import dragElement from '@boilerplate-actions/dragElement';
import focusLastOpenedWindow from '@boilerplate-actions/focusLastOpenedWindow';
import handleModal from '@boilerplate-actions/handleModal';
import moveTo from '@boilerplate-actions/moveTo';
import pause from '@boilerplate-actions/pause';
import pressButton from '@boilerplate-actions/pressButton';
import scroll from '@boilerplate-actions/scroll';
import selectOption from '@boilerplate-actions/selectOption';
import selectOptionByIndex from '@boilerplate-actions/selectOptionByIndex';
import setCookie from '@boilerplate-actions/setCookie';
import setInputField from '@boilerplate-actions/setInputField';
import setPromptText from '@boilerplate-actions/setPromptText';
import switchContext from '@custom-shared-actions/switchContext';
import clickElementWithText from '@custom-shared-actions/clickElementWithText';
import clickElementContainingPartialText from  '@custom-shared-actions/clickElementContainingPartialText'
import setInputFieldWithRandom from '@custom-shared-actions/setInputFieldWithRandom';
import dumpPageContents from '@custom-shared-actions/dumpPageContents';




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
