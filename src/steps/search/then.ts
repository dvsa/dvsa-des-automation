import { Then } from '@cucumber/cucumber';
import checkVehicleSearchResult from '../../app-actions/search-check/checkVehicleSearchResult';

Then(
    /^I expect that the search result inside "([^"]*)?" contains the text "([^"]*)?"$/,
    checkVehicleSearchResult
);

