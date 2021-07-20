Feature: Homepage - Ionic Select Alert Popup selector
    Scenario Outline: Testing ION-Select
        Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::home"
        When I wait on element "ionicapp-homepage::operatingsystem" for 2000ms to exist
        When I click on the button "ionicapp-homepage::operatingsystem"
        Then I click on the button with the text "<optiontext>"
        Then I click on the button with the text "OK"
        Then I expect that element "ionicapp-homepage::operatingsystem" matches the text "<expectedvalue>"

        Examples:
            | optiontext | expectedvalue |
            | Linux      | linux         |
            | Windows    | windows       |
            | OSX        | osx           |

