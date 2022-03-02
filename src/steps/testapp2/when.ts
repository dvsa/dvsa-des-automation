import { When } from '@cucumber/cucumber';
import fillinTab1 from '../../app-actions/testapp-action/page1/fillinTab1';
import navigateToOtherPage from '../../app-actions/testapp-action/page6/navigateToOtherPage';

When(
  /^I fill in the form from a datatable$/,
  fillinTab1,
);

When(
  /^I navigate to the other page$/,
  navigateToOtherPage,
);
