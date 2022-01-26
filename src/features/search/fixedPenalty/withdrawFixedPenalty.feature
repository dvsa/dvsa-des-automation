Feature: Fixed penalty MS-9712
@test
    Scenario Outline: Issue a fixed penalty notice on a trailer
        Given I am signed in as a random user
        Then I wait on element "smc-general::db-spinner" to not be displayed
        When I click on the element "smc-sidemenu::sidemenubutton"
        Then I wait for the "smc-sidemenu::menutitle" menu to show
        Then I click on the button with the text "Current Encounter"
        Then I click on the button with the text "Encounter Details"
        When I fill in the mandatory encounter details from a datatable
            | location        | 4TH MILESTONE LAY-BY |
            | nationality     | Great Britain        |
            | vehicleid       | VRM12                |
            | vehicleType     | HGV Artic            |
            | encounterReason | SPOT CHECK           |
        And I click on the button with the text "Start Encounter"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Vehicle"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#encounterVehicleDetails_pagetitle" to be displayed
        When I fill in the mandatory vehicle details from a datatable
            | make     | ERF   |
            | model    | 123   |
            | body     | ARTIC |
            | seating  | NA    |
            | odometer | 123   |
        Then I click on the button with the text "Driver 1"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#driverDetails_pagetitle" to be displayed
        When I click on the element "#driverDetailsDateOfBirthPicker button"
        When I set "14/10/1996" to the ionic 3 date field "#driverDetailsDateOfBirthPicker"
        Then I click on the button with the text "Done"
        When I fill in the mandatory driver 1 details from a datatable
            | ethnicity            | W2 - IRISH   |
            | firstName            | John         |
            | lastName             | Doe          |
            | resident             | Yes           |
            | Address1             | ad1          |
            | postTown             | 133          |
            | issuingNation        | AL - Albania |
            | drivingLicenceNumber | 123          |
        Then I click on the button with the text "Operator"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#operatorDetails_pagetitle" to be displayed
        When I fill in the mandatory operator details from a datatable
            | nationality | GB          |
            | name        | John        |
            | address1    | 123 Address |
            | posttown    | Devon       |
            | country     | NA          |
        Then I click on the button with the text "Journey"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#journeyDetails_pagetitle" to be displayed
        When I fill in the mandatory journey from a datatable
            | type          | EC    |
            | startLocation | test  |
            | endLocation   | 123   |
            | goodsCarried  | goods |
        Then I click on the button with the text "Roadworthiness Checklist"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#roadWorthinessChecklistTitle" to be displayed
        Then I click on the element "smc-roadworthiness-checklist::save-data-button"
        Then I click on the button with the text "Offences"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#offenceTitle" to be displayed
        When I click on the element "#driverName_0"
        Then I fill in the mandatory offences from a datatable
            | offenceType    | FIXED PENALTY DEFECT     |
            | offenceSubType | BRAKES                   |
            | offence        | BRAKING SYSTEM DEFECTIVE |
        Then I click on the button with the text "Continue Encounter"
        Then I click on the element "#EncounterFixedPenaltyButton"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#fixedPenaltyPageTitle" to be displayed
        When I click on the element "#addDriver_0_Offence_0"
        When I fill in the fixed penalties from a datatable
            | paymentMethod | Cash |
            | cashAmount    | 100  |
        When I click on the element "#addDriver_0_Offence_0"
        Then I click on the button with the text "Reverse Payment"
        When I click on the element "#paymentStatusDropdown"
        Then I click on the button with the text "Reversed"
        When I click on the element "#reversalReasonDropdown"
        Then I click on the button with the text "Refund - see Memo"
        When I click on the element "#saveDataButton"    
        When I click on the element "#fpIssueToggle_0"
        Then I click on the button with the text "OK"
        When I fill in the withdraw reason for a fixed penalty
        Then I click on the element "#additionalTextSaveButton"
        Then I click on the element "#encounterGeneralSiftEncounterButton"
        Then I click on the element "/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-encounter-issue-fixed-penalty/ion-header/ion-navbar/button"
        Then I click on the element "#EncounterNoticeDetailButton"
        Then I wait on element "#addNoticePageTitle" to be displayed
        And I issue a "Technical Roadside Inspection Report (PG35EC)" notice
            | firstName | john |
            | lastName  | doe  |
        And I print all notices
        Then I click on the element "#AdditionalInformationButton"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#additionalInforamtion_pagetitle" to be displayed
        When I fill in the mandatory additional information from a datatable
            | inspectionLevel         | FULL |
            | speedLimitedCheckToggle | Yes  |
            | defectProsecution       | NO   |
        Then I click on the button with the text "Complete Encounter"
        Then I click on the button with the text "OK"
        When I fill in the withdraw reason for a fixed penalty
        Then I click on the element "#additionalTextSaveButton"
        Then I click on the element "#encounterReview"
        Then I click on the button with the text "Submit Encounter"
        Then I wait on element "smc-general::db-spinner" to not be displayed