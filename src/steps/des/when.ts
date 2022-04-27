import { When } from '@cucumber/cucumber';
import completeUnsuccessfullOfficePage from 'src/app-actions/des-action/completeUnsuccessfullOfficePage';
import completeNonPassedFinalOutcomePage from '../../app-actions/des-action/completeNonPassedFinalOutcomePage';
import completeWaitingRoomFailEyesightToCarPage from 'src/app-actions/des-action/completeWaitingRoomFailEyesightToCarPage';
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
import addingFault from '../../app-actions/des-action/addingFault';
import checkCorrectFaults from '../../app-actions/des-action/checkCorrectFaults';

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
  /^I complete the waiting room to car page with fail eyesight$/,
  completeWaitingRoomFailEyesightToCarPage,
);

When(
  /^I click the competency button "([^"]*)?"$/,
  clickCompetencyButton,
);

When(
  /^I complete the successful final outcome screen from a data table$/,
  completePassedFinalOutcomePage,
);

When(
  /^I complete the unsuccessful final outcome screen from a data table$/,
  completeNonPassedFinalOutcomePage,
);

When(
  /^I complete the health declaration page$/,
  completeHealthDeclarationPage,
);

When(
  /^I check the confirmation page details from a data table$/,
  checkConfirmationPageDetails,
);

When(
  /^I complete the Office page from a data table$/,
  completeOfficePage,
);

When(
  /^I complete the Office unsuccessful page from a data table$/,
  completeUnsuccessfullOfficePage,
);

When(
  /^I select all legal requirements$/,
  completeLegalRequirements,
);

When(
  /^I add "([^"]*)?" (driving|serious|dangerous) fault(s)? to the "([^"]*)?" field$/,
  addingFault,
);

When(
  /^I check from a data table the number of faults are correct/,
  checkCorrectFaults,
);
