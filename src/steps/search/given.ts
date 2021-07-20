import { Given } from '@cucumber/cucumber';
import testSWAPI from '../../app-actions/search-action/testSWAPI';
import testUserHTTPExample from '../../app-actions/search-action/testUserHTTPExample';
import testUsingExcelExample from '../../app-actions/search-action/testUsingExcelExample';

Given(
    /^I perform some tests based on the excel file "([^"]*)?"$/,
    testUsingExcelExample
);

Given(
    /^I read (person|planet|film) number "([^"]*)?" from the star wars api$/,
    testSWAPI
);

Given(
    /^I perform some tests based on a http call to "([^"]*)?"$/,
    testUserHTTPExample
);



