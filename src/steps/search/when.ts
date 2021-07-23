import { When } from '@cucumber/cucumber';
import searchLogout from '../../app-actions/search-action/searchLogout';
import searchVehicle from '../../app-actions/search-action/searchVehicle';

When(
    /^I Logout from the search application$/,
    searchLogout
);

When(
    /^I search for "([^"]*)?"$/,
    searchVehicle
);
