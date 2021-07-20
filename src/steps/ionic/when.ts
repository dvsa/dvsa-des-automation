import { When } from '@cucumber/cucumber';
import ionicClickActionButtonWithText from '../../support/ionic/ionic-action/ionic-clickActionButtonWithText';
import ionicClickAlertButtonWithText from '../../support/ionic/ionic-action/ionic-clickAlertButtonWithText';
import ionicClickAwayfromSideMenu from '../../support/ionic/ionic-action/ionic-clickAwayfromSideMenu';

import ionicClickTabButtonWithText from '../../support/ionic/ionic-action/ionic-clickTabButtonWithText';
import ionicSetIonicCheckbox from '../../support/ionic/ionic-action/ionic-setIonicCheckbox';
import ionicSetIonicDateField from '../../support/ionic/ionic-action/ionic-setIonicDateField';
import ionicSetIonicTimeField from '../../support/ionic/ionic-action/ionic-setIonicTimeField';
import ionicSetIonicToggle from '../../support/ionic/ionic-action/ionic-setIonicToggle';
import ionicSwipeItemSliding from '../../support/ionic/ionic-action/ionic-swipeItemSliding';

// Ionic Tab Button
When(
    /^I (click|doubleClick) on the ionic-tab-button with the text "([^"]*)?"$/,
    ionicClickTabButtonWithText
);

// Ionic Time & Date
When(
    /^I set "(\d{2})[/](\d{2})[/](\d{4})" to the ionic date field "([^"]*)?"$/,
    ionicSetIonicDateField
);

When(
    /^I set "(1[0-2]|0?[1-9]):([0-5]?[0-9])([AP]M)?" to the ionic time field "([^"]*)?"$/,
    ionicSetIonicTimeField
);

// Ionic Alert Button
When(
    /^I click the ionic-alert button with the text "([^"]*)?"$/,
    ionicClickAlertButtonWithText
);

// Ionic Action Button
When(
    /^I click the action button with the text "([^"]*)?"$/,
    ionicClickActionButtonWithText
);

// Ionic Toggle
When(
    /^I set the ionic-toggle thats inside "([^"]*)?" with the text "([^"]*)?" (on|off)$/,
    ionicSetIonicToggle
);

// Ionic Checkbox
When(
    /^I set the ionic-checkbox thats inside "([^"]*)?" with the text "([^"]*)?" (on|off)$/,
    ionicSetIonicCheckbox
);

// Ionic Menu
When(
    /^I click away from the ionic-menu "([^"]*)?"$/,
    ionicClickAwayfromSideMenu
);

// ion-item-sliding
When(
    /^I swipe (left|right) on "([^"]*)"$/,
    ionicSwipeItemSliding
);