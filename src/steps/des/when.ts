import { When } from '@cucumber/cucumber';
import completeUnsuccessfullOfficePage from 'src/app-actions/des-action/completeUnsuccessfullOfficePage';
import completeWaitingRoomFailEyesightToCarPage from 'src/app-actions/des-action/completeWaitingRoomFailEyesightToCarPage';
import completeRekeyReasonPage from 'src/app-actions/des-action/completeRekeyReasonPage';
import completeNonPassedFinalOutcomePage from '../../app-actions/des-action/completeNonPassedFinalOutcomePage';
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
import startTest from '../../app-actions/des-action/startTest';
import logOut from '../../app-actions/des-action/logOut';
import studentOptionADI3 from '../../app-actions/des-action/studentOptionADI3';
import lessonOptionADI3 from '../../app-actions/des-action/lessonOptionADI3';
import testReportADI3Questions from '../../app-actions/des-action/testReportADI3Questions';
import keyboardClickLetter from '../../app-actions/des-action/keyboardClickLetter';
import completeCandidateIDPage from '../../app-actions/des-action/completeCandidateIDPage';
import completeAuthPage from '../../app-actions/des-action/completeAuthPage';

When(
  /^I am signed in as a random "([^"]*)?" user$/,
  loginWebAsUser,
);

When(
  /^I complete the waiting room declaration page( for a category "([^"]*)?")?$/,
  completeDeclarationPage,
);

When(
  /^I complete the candidate ID page from a data table$/,
  completeCandidateIDPage,
);

When(
  /^I complete the waiting room for vocational declaration page$/,
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

When(
  /^I start the test for( rekey)* "([^"]*)?"$/,
  startTest,
);

When(
  /^I sign out$/,
  { timeout: 120000 },
  logOut,
);

When(
  /^I select the student option "([^"]*)?"$/,
  studentOptionADI3,
);

When(
  /^I select the lesson theme options$/,
  lessonOptionADI3,
);

When(
  /^I score (\d+) for the (\d+)(st|nd|rd|th) question for section "([^"]*)?"$/,
  testReportADI3Questions,
);

When(
  /^I input the letter "([^"]*)?" into adi3 review textbox$/,
  keyboardClickLetter,
);

When(
  /^I complete the auth page$/,
  completeAuthPage,
);
