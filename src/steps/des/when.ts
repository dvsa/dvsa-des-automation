import { When } from '@cucumber/cucumber';
import desLogin from '../../app-actions/des-action/desLogin';
import loginWebAsUser from '../../app-actions/des-action/desLoginAsUser'
import completeDeclarationPage from '../../app-actions/des-action/completeDeclarationPage';
import completeComunicationPage from '../../app-actions/des-action/completeComunicationPage';
import completeWaitingRoomToCarPage from '../../app-actions/des-action/completeWaitingRoomToCarPage';

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
