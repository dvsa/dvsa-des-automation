Feature: Operator Visit - Record TE

    Scenario Outline: Operator Visit TE
        Given I am signed in as a random user
        Then I wait on element "smc-general::db-spinner" to not be displayed
        When I click on the element "smc-sidemenu::sidemenubutton"
        Then I wait for the "smc-sidemenu::menutitle" menu to show
        Then I click on the button with the text "Operator Visits"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#operatorVisits_pageTitle" to be displayed
        Then I click on the button with the text "Start New Visit"
        Then I fill in operator visit details from a datatable
            | visitType     | TE                  |
            | caseNo        | 1111/2/00           |
            | visitReason   | TE New Operator     |
            | licenceNumber | LS1231231           |
            | operatorName  | name                |
            | address1      | add1                |
            | postTown      | swansea             |
            | analogue      | 0                   |
            | digitalDays   | 0                   |
            | driversHours  | Mostly Satsifactory |
            | otherSystems  | Satisfactory        |
        Then I click on the button with the text "Complete Visit"
        Then I click on the button with the text "Submit Visit"
        And I wait for the loading spinner with the text "Sending"
        Then I click on the button with the text "Back To Dashboard"