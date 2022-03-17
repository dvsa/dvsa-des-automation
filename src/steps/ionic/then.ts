import { Then } from '@cucumber/cucumber';
import waitForSpinningWheel from '@shared-custom/support/action/waitForSpinningWheel';
import ionicCheckToastMessage from '@shared-custom/support/ionic/ionic-check/ionic-checkToastMessage';
import checkEqualsTime from '@shared-custom/support/common/check/checkEqualsTime';
import ionicWaitforSideMenu from '@shared-custom/support/ionic/ionic-action/ionic-waitforSideMenu';
import ionicCheckBadge from '@shared-custom/support/ionic/ionic-check/ionic-checkBadge';
import ionicCheckCheckbox from '@shared-custom/support/ionic/ionic-check/ionic-checkCheckbox';
import ionicCheckIonicToggle from '@shared-custom/support/ionic/ionic-check/ionic-checkToggle';
import waitForTextToBe from '@shared-custom/support/lib/waitForTextToBe';
import ionicCheckCard from '@shared-custom/support/ionic/ionic-check/ionic-checkCard';

Then(
  /^I expect that element "([^"]*)?"( not)* matches the time "([^"]*)?"$/,
  checkEqualsTime,
);

Then(
  /^I wait for the text to be "([^"]*)?" in "([^"]*)?"$/,
  waitForTextToBe,
);

Then(
  /^I expect the ionic-toggle thats inside "([^"]*)?" with the text "([^"]*)?" to be (on|off)$/,
  ionicCheckIonicToggle,
);

Then(
  /^I expect the ionic-checkbox with the text "([^"]*)" should (be|not be) selected$/,
  ionicCheckCheckbox,
);

/**
 * Pass in the id for menu title
 */
Then(
  /^I wait for the "([^"]*)" menu to (show|hide)$/,
  ionicWaitforSideMenu,
);

// Ionic Loading Spinner
Then(
  /^I wait for the loading spinner with the text "([^"]*)"$/,
  waitForSpinningWheel,
);

// Ionic Toast
Then(
  /^I expect the ionic-toast message to contain the text "([^"]*)?"$/,
  ionicCheckToastMessage,
);

// Ionic Badge
Then(
  /^I expect the ionic-badge "([^"]*)" to contain the text "([^"]*)?"$/,
  ionicCheckBadge,
);

// Ionic Card
Then(
  /^I expect the ionic-card "([^"]*)" (header|content) to (contain|be) the text "([^"]*)?"$/,
  ionicCheckCard,
);
