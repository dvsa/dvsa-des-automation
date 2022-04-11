import { When } from '@cucumber/cucumber';
import desLogin from '../../app-actions/des-action/desLogin';
import loginWebAsUser from '../../app-actions/des-action/desLoginAsUser';
import completeDeclarationPage from '../../app-actions/des-action/completeDeclarationPage';
import completeComunicationPage from '../../app-actions/des-action/completeComunicationPage';
import completeWaitingRoomToCarPage from '../../app-actions/des-action/completeWaitingRoomToCarPage';
import clickCompetencyButton from '../../app-actions/des-action/clickCompetencyButton';
import completePassedFinalOutcomePage from '../../app-actions/des-action/completePassedFinalOutcomePage';
import completeHealthDeclarationPage from '../../app-actions/des-action/completeHealthDeclarationPage';
import checkConfirmationPageDetails from '../../app-actions/des-action/checkConfirmationPageDetails';
import completeOfficePage from '../../app-actions/des-action/completeOfficePage';
import completeLegalRequirements from '../../app-actions/des-action/completeLegalRequirements';

When(
  /^I am signed in as a random user$/,
  desLogin,
);

When(
  /^I am signed in as a random "([^"]*)?" user$/,
  loginWebAsUser,
);

When(
  /^I complete the waiting room declaration page$/,
  completeDeclarationPage,
);

When(
  /^I complete the waiting room communication page$/,
  completeComunicationPage,
);

When(
  /^I complete the waiting room to car page$/,
  completeWaitingRoomToCarPage,
);

When(
  /^I click the competency button "([^"]*)?"$/,
  clickCompetencyButton,
);

When(
  /^I complete the successful final outcome screen from a database$/,
  completePassedFinalOutcomePage,
);

When(
  /^I complete the health declaration page$/,
  completeHealthDeclarationPage,
);

When(
  /^I check the confirmation page details from a database$/,
  checkConfirmationPageDetails,
);

When(
  /^I complete the Office page from a database$/,
  completeOfficePage,
);

When(
  /^I select all legal requirements$/,
  completeLegalRequirements,
);
