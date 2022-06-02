import { When } from '@cucumber/cucumber';
import completeUnsuccessfullOfficePage from 'src/app-actions/des-action/completeUnsuccessfullOfficePage';
import completeWaitingRoomFailEyesightToCarPage from 'src/app-actions/des-action/completeWaitingRoomFailEyesightToCarPage';
import completeRekeyReasonPage from 'src/app-actions/des-action/completeRekeyReasonPage';
import completeNonPassedFinalOutcomePage from '../../app-actions/des-action/completeNonPassedFinalOutcomePage';
import desLogin from '../../app-actions/des-action/desLogin';
import loginWebAsUser from '../../app-actions/des-action/desLoginAsUser';
import completeDeclarationPage from '../../app-actions/des-action/completeDeclarationPage';
import completeComunicationPage from '../../app-actions/des-action/completeComunicationPage';
import clickCompetencyButton from '../../app-actions/des-action/clickCompetencyButton';
import completePassedFinalOutcomePage from '../../app-actions/des-action/completePassedFinalOutcomePage';
import completeHealthDeclarationPage from '../../app-actions/des-action/completeHealthDeclarationPage';
import checkConfirmationPageDetails from '../../app-actions/des-action/checkConfirmationPageDetails';
import completeOfficePage from '../../app-actions/des-action/completeOfficePage';
import completeLegalCatCRequirements from '../../app-actions/des-action/completeCatCLegalRequirements';
import completeLegalRequirements from '../../app-actions/des-action/completeLegalRequirements';
import addingFault from '../../app-actions/des-action/addingFault';
import checkCorrectFaults from '../../app-actions/des-action/checkCorrectFaults';
import completeCatCDeclarationPage from '../../app-actions/des-action/completeCatCDeclarationPage';
import changeDayCheckDate from '../../app-actions/des-action/changeDayCheckDate';
import completeWaitingRoomToCarPageDataTable from '../../app-actions/des-action/completeWaitingRoomToCarPageDataTable';

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
  /^I complete the waiting room Cat C or D declaration page$/,
  completeCatCDeclarationPage,
);

When(
  /^I complete the waiting room communication page$/,
  completeComunicationPage,
);

When(
  /^I complete the waiting room to car page from a data table for a category "([^"]*)?"$/,
  completeWaitingRoomToCarPageDataTable,
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
  /^I complete the (unsuccessful|terminated) final outcome screen from a data table$/,
  completeNonPassedFinalOutcomePage,
);

When(
  /^I complete the health declaration page for a category "([^"]*)?"$/,
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
  /^I select all legal requirements for a category "([^"]*)?"$/,
  completeLegalRequirements,
);

When(
  /^I select all legal requirements Cat C$/,
  completeLegalCatCRequirements,
);

When(
  /^I add "([^"]*)?" (driving|serious|dangerous) fault(s)? to the "([^"]*)?" field$/,
  addingFault,
);

When(
  /^I check from a data table the number of faults are correct/,
  checkCorrectFaults,
);

When(
  /^I go (back|forward) ([\d]+) day and check the date is correct$/,
  changeDayCheckDate,
);

When(
  /^I complete the Rekey reason page from a data table$/,
  completeRekeyReasonPage,
);
