import { When } from '@cucumber/cucumber';

import clearInputField from '../../support/common/action/clearInputField';
// import clickElement from '../../support/common/action/clickElement';
import { clickElement } from '@dvsa/app-dev-automation/src/support/common/action/clickElement';
import clickElementWithText from '../../support/common/action/clickElementWithText';
import clickElementContainingPartialText from  '../../support/common/action/clickElementContainingPartialText'
import clickElementWithTextThatsInside from '../../support/common/action/clickElementWithTextThatsInside';
import closeLastOpenedWindow from '../../support/common/action/closeLastOpenedWindow';
import deleteCookies from '../../support/common/action/deleteCookies';
import dragElement from '../../support/common/action/dragElement';
import dumpPageContents from '../../support/common/action/dumpPageContents';
import focusLastOpenedWindow from '../../support/common/action/focusLastOpenedWindow';
import handleModal from '../../support/common/action/handleModal';
import moveTo from '../../support/common/action/moveTo';
import pause from '../../support/common/action/pause';
import pressButton from '../../support/common/action/pressButton';
import scroll from '../../support/common/action/scroll';
import selectOption from '../../support/common/action/selectOption';
import selectOptionByIndex from '../../support/common/action/selectOptionByIndex';
import setCookie from '../../support/common/action/setCookie';
import setInputField from '../../support/common/action/setInputField';
import setInputFieldWithRandom from '../../support/common/action/setInputFieldWithRandom';
import setPromptText from '../../support/common/action/setPromptText';
import switchContext from '../../support/common/action/switchContext';

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
