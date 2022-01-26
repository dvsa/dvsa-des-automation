Feature: Homepage - Side menu

    Scenario Outline: Get to the <menuitem> page
        Then I wait on element "smc-general::db-spinner" to not be displayed
        # Then I wait on element "smc-sidemenu::sidemenubutton" for 4000ms to be displayed
        When I click on the element "smc-sidemenu::sidemenubutton"
        Then I wait for the "smc-sidemenu::menutitle" menu to show
        Then I click on the button with the text "<menuitem>"
        # Then I wait for the "smc-sidemenu::menutitle" menu to hide
        Then I wait for the loading spinner with the text "Loading"
        # Then I wait on element "<title_element>" for 4000ms to be displayed
        Then I expect that element "<title_element>" matches the text "<pagetitle>"
        # And I pause for 500ms

        Examples:
            | menuitem                  | title_element                         | pagetitle             |
            | Driver Search             | smc-general::pt-driver                | Driver Search         |
            | Encounter Search          | smc-general::pt-encountersearch       | Encounter Search      |
            | Incomplete Encounters     | smc-general::pt-incompleteencounters  | Incomplete Encounters |
            | Current Encounter         | smc-general::pt-currentencounter      | Current Encounter     |
            | Close Prohibitions        | smc-general::pt-closeprohibitions     | Search Prohibitions   |
            | Operator Visits           | smc-general::pt-operatorvisits        | Operator Visits       |

    Scenario: Get to the search vehicle page
        Then I wait on element "smc-general::db-spinner" to not be displayed
        When I click on the element "smc-sidemenu::sidemenubutton"
        Then I wait for the "smc-sidemenu::menutitle" menu to show
        Then I click on the button with the text "Vehicle Search"
        Then I wait for the loading spinner with the text "Loading"
