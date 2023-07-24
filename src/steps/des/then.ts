import { Then } from '@cucumber/cucumber';
import checkCandidateTestDetailsCard from '../../app-actions/des-action/checkCandidateTestSlot';
import checkActivityCode from '../../app-actions/des-action/checkActivityCode';

Then(
  /^the candidates test details are shown$/,
  checkCandidateTestDetailsCard,
);

Then(
  /^I expect the activity code "([^"]*)?" matches the text "([^"]*)?"$/,
  checkActivityCode,
);
