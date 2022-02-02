import { When } from '@cucumber/cucumber';
import desLogin from '../../app-actions/des-action/desLogin';
import loginWebAsUser from '../../app-actions/des-action/desLoginAsUser'

When(
    /^I am signed in as a random user$/,
    desLogin
);

When(
  /^I am signed in as a random "([^"]*)?" user$/,
  loginWebAsUser
);
