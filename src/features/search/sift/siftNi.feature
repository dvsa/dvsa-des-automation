Feature: Sift - NI

    @siftni
    Scenario: Sift Multinational NI
        Given I am signed in as a random user
        And I wait for the loading spinner with the text "Refreshing databases"
        When I click on the element "smc-sidemenu::sidemenubutton"
        Then I wait for the "smc-sidemenu::menutitle" menu to show
        Then I click on the button with the text "Current Encounter"
        Then I click on the button with the text "Encounter Details"
        When I fill in the mandatory encounter details from a datatable
            | location        | 911 RECOVERY ATF     |
            | nationality     | Northern Ireland     |
            | vehicleid       | VRM12                |
            | vehicleType     | HGV Artic            |
            | encounterReason | SPOT CHECK           |
        Then I click on the button with the text "Sift Encounter"
        Then I click on the button with the text "Submit Encounter"
        Then I expect that element "smc-encounter-search-submitted::success-submitted-text" contains the text "Encounter Successfully Submitted"
        Then I click on the button with the text "Back to Dashboard"