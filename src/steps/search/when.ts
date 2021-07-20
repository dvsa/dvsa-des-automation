import { When } from '@cucumber/cucumber';
import searchLogin from '../../app-actions/search-action/searchLogin';
import searchLogout from '../../app-actions/search-action/searchLogout';
import searchVehicle from '../../app-actions/search-action/searchVehicle';

When(
    /^I am signed in as a random user$/,
    searchLogin
);

When(
    /^I Logout from the search application$/,
    searchLogout
);

When(
    /^I search for "([^"]*)?"$/,
    searchVehicle
);
