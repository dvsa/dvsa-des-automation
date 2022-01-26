Feature: Weights 3 axle vehicle
    Scenario Outline: Weight 3 axle vehicle
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
        Then I click on the button with the text "Weights"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#weightsTitle" to be displayed
        When I fill in the weights page from a datatable
            | axleNumber     | 3  |
            | axle1Actual    | 25 |
            | axle1Permitted | 26 |
            | axle2Actual    | 25 |
            | axle2Permitted | 26 |
            | axle3Actual    | 25 |
            | axle3Permitted | 26 |
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Additional Information"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#additionalInforamtion_pagetitle" to be displayed
        When I fill in the mandatory additional information from a datatable
            | inspectionLevel         | FULL |
            | speedLimitedCheckToggle | Yes  |
            | defectProsecution       | NO   |
        Then I click on the button with the text "Complete Encounter"
        Then I click on the button with the text "Submit Encounter"