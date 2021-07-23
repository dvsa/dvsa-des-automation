import { When } from '@cucumber/cucumber';
import desLogin from '../../app-actions/des-action/desLogin';

When(
    /^I am signed in as a random user$/,
    desLogin
);
