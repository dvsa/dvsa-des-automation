import { When } from '@cucumber/cucumber';
import ionicClickActionButtonWithText from '@shared-custom/support/ionic/ionic-action/ionic-clickActionButtonWithText';
import ionicClickAlertButtonWithText from '@shared-custom/support/ionic/ionic-action/ionic-clickAlertButtonWithText';
import ionicClickTabButtonWithText from '@shared-custom/support/ionic/ionic-action/ionic-clickTabButtonWithText';
import ionicClickAwayfromSideMenu from '@shared-custom/support/ionic/ionic-action/ionic-clickAwayfromSideMenu';
import ionicClickSegmentButtonWithText from '@shared-custom/support/ionic/ionic-action/ionic-clickSegmentButtonWithText';

import ionicSetIonic3DateField from '@shared-custom/support/ionic/ionic-action/ionic-setIonic3DateField';
import ionicSetIonicCheckbox from '@shared-custom/support/ionic/ionic-action/ionic-setIonicCheckbox';
import ionicSetIonicDateField from '@shared-custom/support/ionic/ionic-action/ionic-setIonicDateField';
import ionicSetIonicTimeField from '@shared-custom/support/ionic/ionic-action/ionic-setIonicTimeField';
import ionicSetIonicToggle from '@shared-custom/support/ionic/ionic-action/ionic-setIonicToggle';
import ionicSwipeItemSliding from '@shared-custom/support/ionic/ionic-action/ionic-swipeItemSliding';
import ionicSetIonicTogglebyId from '@shared-custom/support/ionic/ionic-action/ionic-setIonicTogglebyId';

// Ionic Tab Button
When(
  /^I (click|doubleClick) on the ionic-tab-button with the text "([^"]*)?"$/,
  ionicClickTabButtonWithText,
);

// Ionic Time & Date

// Ionic 4+5
When(
  /^I set "(\d{2})[/](\d{2})[/](\d{4})" to the ionic date field "([^"]*)?"$/,
  ionicSetIonicDateField,
);

// Ionic 3
When(
  /^I set "(\d{2})[/](\d{2})[/](\d{4})" to the ionic 3 date field "([^"]*)?"$/,
  ionicSetIonic3DateField,
);

When(
  /^I set "(1[0-2]|0?[1-9]):([0-5]?[0-9])([AP]M)?" to the ionic time field "([^"]*)?"$/,
  ionicSetIonicTimeField,
);

// Ionic Alert Button
When(
  /^I click the ionic-alert button with the text "([^"]*)?"$/,
  ionicClickAlertButtonWithText,
);

// Ionic Action Button
When(
  /^I click the action button with the text "([^"]*)?"$/,
  ionicClickActionButtonWithText,
);

// Ionic Toggle
When(
  /^I set the ionic-toggle thats inside "([^"]*)?" with the text "([^"]*)?" (on|off|yes|no)$/,
  ionicSetIonicToggle,
);

// Ionic Toggle by ID
When(
  /^I set the ionic-toggle by id "([^"]*)?" (on|off)$/,
  ionicSetIonicTogglebyId,
);

// Ionic Checkbox
When(
  /^I set the ionic-checkbox thats inside "([^"]*)?" with the text "([^"]*)?" (on|off)$/,
  ionicSetIonicCheckbox,
);

// Ionic Segment
When(
  /^I click the ionic-segment-button "([^"]*)?" with the text "([^"]*)?"$/,
  ionicClickSegmentButtonWithText,
);

// Ionic Menu
When(
  /^I click away from the ionic-menu "([^"]*)?"$/,
  ionicClickAwayfromSideMenu,
);

// ion-item-sliding
When(
  /^I swipe (left|right) on "([^"]*)"$/,
  ionicSwipeItemSliding,
);
