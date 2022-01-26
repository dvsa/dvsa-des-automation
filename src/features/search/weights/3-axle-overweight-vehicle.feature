Feature: Weights 3 axle vehicle
    Scenario Outline: Weight 3 axle overweight vehicle
        Given I am signed in as a random user
        And I wait for the loading spinner with the text "Refreshing databases"
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
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Journey"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#journeyDetails_pagetitle" to be displayed
        When I fill in the mandatory journey from a datatable
            | type          | EC    |
            | startLocation | test  |
            | endLocation   | 123   |
            | goodsCarried  | goods |
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Operator"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#operatorDetails_pagetitle" to be displayed
        When I fill in the mandatory operator details from a datatable
            | nationality | GB          |
            | name        | John        |
            | address1    | 123 Address |
            | posttown    | Devon       |
            | country     | NA          |
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Roadworthiness Checklist"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#roadWorthinessChecklistTitle" to be displayed
        Then I click on the element "smc-roadworthiness-checklist::save-data-button"
        Then I click on the button with the text "Weights"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#weightsTitle" to be displayed
        When I fill in the weights page from a datatable
            | axleNumber     | 3    |
            | axle1Actual    | 2000 |
            | axle1Permitted | 1500 |
            | axle2Actual    | 2000 |
            | axle2Permitted | 2000 |
            | axle3Actual    | 2000 |
            | axle3Permitted | 2000 |
        Then I click on the button with the text "OK"
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Additional Information"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#additionalInforamtion_pagetitle" to be displayed
        When I fill in the mandatory additional information from a datatable
            | inspectionLevel         | FULL |
            | speedLimitedCheckToggle | Yes  |
            | defectProsecution       | NO   |
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        When I scroll to element "smc-notices::notice-page-click"
        When I click on the element "smc-notices::notice-page-click"
        Then I wait on element "#addNoticePageTitle" to be displayed
        Then I wait on element "smc-general::db-spinner" to not be displayed
        When I issue a "Technical Roadside Inspection Report (PG35EC)" notice
            | firstName | john |
            | lastName  | doe  |
        When I issue a "Weight Certificate (Dynamic)" notice
            | firstName | jane |
            | lastName  | doe  |
        Then I click on the button with the text "Review & Print Notices"
        Then I click on the button with the text "Continue Encounter"
        Then I click on the button with the text "Leave"
        Then I click on the button with the text "Complete Encounter"
        Then I click on the button with the text "Submit Encounter"
