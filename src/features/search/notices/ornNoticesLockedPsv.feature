Feature: ORN Notices Lock Screen Checks
    Scenario Outline: Issue a ORN Notice and Check for Lock Screen toast messages
        Given I am signed in as a random user
        And I wait for the loading spinner with the text "Refreshing databases"
        When I click on the element "smc-sidemenu::sidemenubutton"
        Then I wait for the "smc-sidemenu::menutitle" menu to show
        Then I click on the button with the text "Current Encounter"
        Then I click on the button with the text "Encounter Details"
        When I fill in the mandatory encounter details from a datatable
            | location        | 4TH MILESTONE LAY-BY |
            | nationality     | Albania        |
            | vehicleid       | VRM12                |
            | vehicleType     | PSV 16+ Seats        |
            | encounterReason | SPOT CHECK           |
        And I click on the button with the text "Start Encounter"
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Vehicle"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#encounterVehicleDetails_pagetitle" to be displayed
        When I fill in the mandatory vehicle details from a datatable
            | make     | ERF        |
            | model    | 123        |
            | body     | PSV SINGLE |
            | seating  | 6          |
            | odometer | 123        |
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Driver 1"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#driverDetails_pagetitle" to be displayed
        When I click on the element "#driverDetailsDateOfBirthPicker button"
        When I set "14/10/1996" to the ionic 3 date field "#driverDetailsDateOfBirthPicker"
        Then I click on the button with the text "Done"
        When I fill in the mandatory driver 1 details from a datatable
            | ethnicity            | W1 - BRITISH |
            | firstName            | John         |
            | lastName             | Doe          |
            | resident             | No           |
            | Address1             | ad1          |
            | postTown             | 133          |
            | issuingNation        | AL - Albania |
            | drivingLicenceNumber | 123          |
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
        Then I click on the button with the text "Journey"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#journeyDetails_pagetitle" to be displayed
        When I fill in the mandatory journey from a datatable
            | type          | EC    |
            | startLocation | test  |
            | endLocation   | 123   |
            | goodsCarried  | goods |
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Offences"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#offenceTitle" to be displayed
        When I click on the element "#driverName_0"
        Then I fill in the mandatory offences from a datatable
            | offenceType    | OFFENCE RECTIFICATION |
            | offenceSubType | NA                    |
            | offence        | 2 YR ANALOGUE CHECK   |
        Then I click on the button with the text "Continue Encounter"
        Then I click on the button with the text "Notice Unissued Notices"
        When I issue a "ORN1 Tacho 2 Year Inspection" notice
            | firstName | john |
            | lastName  | doe  |
        And I pause for 1000ms
        And I click on the element "smc-baseionic::backbuttonfinder"
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Additional Information"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#additionalInforamtion_pagetitle" to be displayed
        And I click on the element "smc-additional-information::save-data-button"
        Then I click on the button with the text "Complete Encounter"
        And I click on the button with the text "Submit Encounter"