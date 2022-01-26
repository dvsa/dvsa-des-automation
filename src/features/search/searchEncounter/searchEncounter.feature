Feature: Encounter Search
    Scenario Outline: Encounter Search & Copy to Current Encounter Submission
        Given I am signed in as a random user
        And I wait for the loading spinner with the text "Refreshing databases"
        When I click on the element "smc-sidemenu::sidemenubutton"
        Then I wait for the "smc-sidemenu::menutitle" menu to show
        Then I click on the button with the text "Encounter Search"
        When I click on the element "#encounterStartDateMobile button"
        When I set "01/09/2021" to the ionic 3 date field "#encounterStartDateMobile"
        Then I click on the button with the text "Done"
        When I fill in the encounter search details from a datatable
            | vrm      | VRM12 |
            | examiner | NA    |
        And I click on the button with the text "Search"
        And I click on the element "#encounterResultCard_0"        
        And I click on the button with the text "Submit"
        And I click on the element "smc-encounter-details::copy-reason-button"
        And I click on the button with the text "Transfer to VE"
        And I click on the button with the text "Start Encounter"
        Then I click on the button with the text "Vehicle MISSING MANDATORY DATA"
        When I fill in the mandatory vehicle details from a datatable
            | make     | ERF   |
            | model    | 123   |
            | body     | NA    |
            | seating  | NA    |
            | odometer | 123   |
        Then I click on the button with the text "Journey"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#journeyDetails_pagetitle" to be displayed
        When I fill in the mandatory journey from a datatable
            | type          | EC    |
            | startLocation | test  |
            | endLocation   | 123   |
            | goodsCarried  | goods |
        Then I click on the button with the text "Additional Information"
         Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#additionalInforamtion_pagetitle" to be displayed
        And I click on the element "smc-additional-information::save-data-button"
        And I click on the button with the text "Complete Encounter"
        Then I click on the button with the text "Submit Encounter"