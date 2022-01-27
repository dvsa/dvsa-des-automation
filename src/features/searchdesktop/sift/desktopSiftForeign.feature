Feature: Desktop Sift - Foreign

    @siftforeign
    Scenario: Sift Multinational Foreign
        Given I open the url "https://search.test.dvsacloud.uk/"
        And I login on the desktop
        Then I click on the button with the text "Current Encounter"
        Then I click on the button with the text "Encounter Details"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        When I fill in the mandatory encounter details from a datatable
            | location        | 4TH MILESTONE LAY-BY |
            | nationality     | Albania              |
            | vehicleid       | VRM12                |
            | vehicleType     | HGV Artic            |
            | encounterReason | SPOT CHECK           |
        Then I click on the button with the text "Sift Encounter"
        Then I click on the button with the text "Submit Encounter"
        Then I expect that element "smc-encounter-search-submitted::success-submitted-text" contains the text "Encounter Successfully Submitted"
        Then I click on the button with the text "Back to Dashboard"