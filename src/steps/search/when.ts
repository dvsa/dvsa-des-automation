import { When } from '@cucumber/cucumber';
import fillMandatoryAdditionalInformation from '../../app-actions/search-action/additional-information/fillMandatoryAdditionalInformation';
import fillDriverDetails from '../../app-actions/search-action/driver/fillDriverDetails';
import fillEncounterDetails from '../../app-actions/search-action/encounter/fillEncounterDetails';
import fillDangerousGoods from '../../app-actions/search-action/dangerousgoods/fillDangerousGoods';
import fillOperatorDetails from '../../app-actions/search-action/operator/fillOperatorDetails';
import searchLogin from '../../app-actions/search-action/searchLogin';
import searchLogout from '../../app-actions/search-action/searchLogout';
import searchVehicle from '../../app-actions/search-action/searchVehicle';
import openEncounterFromBurgerMenu from '../../app-actions/search-action/encounter'
import fillTrailerDetails from '../../app-actions/search-action/trailer/fillTrailerDetails';
import fillVehicleDetailsfromDatatable from '../../app-actions/search-action/vehicle/fillVehicleDetailsfromDatatable';
import fillRoadworthiness from '../../app-actions/search-action/roadworthiness/fillRoadworthiness';
import fillAllAdditionalInformation from '../../app-actions/search-action/additional-information/fillAllAdditionalInformation';
import addDefectToVehicle from '../../app-actions/search-action/defects/addVehicleDefect'
import addDefectToTrailer from '../../app-actions/search-action/defects/addTrailerDefect'
import fillAllMandatoryJourneyDetails from '../../app-actions/search-action/journey/fillAllMandatoryJourneyDetails';
import driverOffence from '../../app-actions/search-action/offences/driverOffence';
import driverOffenceWithGroupOffence from '../../app-actions/search-action/offences/driverOffenceWithGroupOffence'
import fillFixedPenalty from '../../app-actions/search-action/fixed-penalties/fillFixedPenalty';
import fillWeightsPage from '../../app-actions/search-action/weights/fillWeightsPage';
import fillEncounterSearchDetails from '../../app-actions/search-action/encountersearch/fillEncounterSearchDetails';
import addNoticeByName from '../../app-actions/search-action/notices/addNoticeByName'
import withdrawFixedPenalty from '../../app-actions/search-action/fixed-penalties/withdrawFixedPenalty';
import fillNoticeDetails from '../../app-actions/search-action/notices/fillNoticeDetails';
import fillOperatorVisits from '../../app-actions/search-action/operator-visits/fillOperatorVisits';
import desktopLogin from '../../app-actions/search-action/search-desktop/desktopLogin';
import reviewAndPrintNotices from '../../app-actions/search-action/notices/printNotices'
import fillInWithdrawFixedPenaltyReason from '../../app-actions/search-action/fixed-penalties/fillInwithdrawFixedPenaltyReason'

When(
    /^I am signed in as a random user$/,
    searchLogin
);
When(
    /^I login on the desktop$/,
    desktopLogin
);

When(
    /^I Logout from the search application$/,
    searchLogout
);

When(
    /^I search for "([^"]*)?"$/,
    searchVehicle
);

When(
    /^I have started an encounter from the burger menu$/,
    openEncounterFromBurgerMenu
)
/***
* Encounter Details
*/
When(
    /^I fill in the mandatory encounter details from a datatable$/,
    fillEncounterDetails
);

/***
* Vehicle Details
*/
When(
    /^I fill in the mandatory vehicle details from a datatable$/,
    fillVehicleDetailsfromDatatable
);

/***
* Trailer 1 Details
*/
When(
    /^I fill in the mandatory trailer 1 details from a datatable$/,
    fillTrailerDetails
);
When(
    /^I fill in the mandatory trailer 2 details from a datatable$/,
    fillTrailerDetails
);

/***
* Driver 1 Details
*/
When(
    /^I fill in the mandatory driver 1 details from a datatable$/,
    fillDriverDetails
);

When(
    /^I fill in the mandatory driver 2 details from a datatable$/,
    fillDriverDetails
);
/***
* Dangerous Goods Page
*/
When(
    /^I fill in the mandatory encounter details with location "([^"]*)?" nationality "([^"]*)?" vehicle id "([^"]*)?" vehicle type "([^"]*)?" encounter reason "([^"]*)?"$/,
    fillEncounterDetails
);

When(
    /^I fill in the mandatory dangerous goods from a datatable$/,
    fillDangerousGoods
);

/***
* operator Page
*/
When(
    /^I fill in the mandatory operator details from a datatable$/,
    fillOperatorDetails
);
/***
* roadworthiness Page
*/
When(
    /^I click the roadworthiness save data$/,
    fillRoadworthiness
);
/***
* Additional Information Page
*/
When(
    /^I fill in the mandatory additional information from a datatable$/,
    fillMandatoryAdditionalInformation
);
/***
* Offences Page
*/
When(
    /^I fill in the mandatory offences from a datatable$/,
    driverOffence
);
When(
    /^I fill in the mandatory offences with offencegroup from a datatable$/,
    driverOffenceWithGroupOffence
);

/***
* Additional Information Page (All Details)
*/
When(
    /^I fill in all additional information from a datatable$/,
    fillAllAdditionalInformation
);
// Vehicle Defects
When(
    /^I add an "([^"]*)?" defect to the vehicle from a datatable$/,
    addDefectToVehicle
);
// Trailer Defects
When(
    /^I add an "([^"]*)?" defect on trailer 1 from a datatable$/,
    addDefectToTrailer
);
When(
    /^I add an "([^"]*)?" defect on trailer 2 from a datatable$/,
    addDefectToTrailer
);
/***
* Journey Page
*/
When(
    /^I fill in the mandatory journey from a datatable$/,
    fillAllMandatoryJourneyDetails
);
/***
*  Fixed Penalties
*/
When(
    /^I fill in the fixed penalties from a datatable$/,
    fillFixedPenalty
);
When(
    /^I remove the fixed penalties from a driver$/,
    withdrawFixedPenalty
);
/***
* Weights Page
*/
When(
    /^I fill in the weights page from a datatable$/,
    fillWeightsPage
);
/***
* Encounter Search Page
*/
When(
    /^I fill in the encounter search details from a datatable$/,
    fillEncounterSearchDetails
);
/***
* Notices
*/
When(
    /^I issue a "([^"]*)?" notice$/,
    addNoticeByName
);
When(
    /^I fill notice details via datatable$/,
    fillNoticeDetails
);
/***
* Operator Visits
*/
When(
    /^I fill in operator visit details from a datatable$/,
    fillOperatorVisits
);

When(
    /^I print all notices/,
    reviewAndPrintNotices
)

When(
    /^I fill in the withdraw reason for a fixed penalty$/,
    fillInWithdrawFixedPenaltyReason
);

 
