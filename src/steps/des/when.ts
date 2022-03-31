import { When } from '@cucumber/cucumber';
import desLogin from '../../app-actions/des-action/desLogin';
<<<<<<< HEAD
import loginWebAsUser from '../../app-actions/des-action/desLoginAsUser';
=======
import loginWebAsUser from '../../app-actions/des-action/desLoginAsUser'
import clickElementLong from '../../app-actions/des-action/desLongClick'
>>>>>>> mes-7482_cat-b_successful_tests

When(
  /^I am signed in as a random user$/,
  desLogin,
);

When(
  /^I am signed in as a random "([^"]*)?" user$/,
  loginWebAsUser,
);

When(
  /^I long click on the (link|button|element) "([^"]*)?"$/,
  clickElementLong
);
