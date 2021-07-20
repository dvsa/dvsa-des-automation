Feature: Ionic List Testing
        Background: Navigate to the second tab
                Given The app is loaded using "ionicapp-general::pagetitle"

                When I click on the button "ionicapp-general::pizza"
                Then I wait for the text to be "Checking out the chips" in "ionicapp-general::pagetitle"
                Then I expect that element "ionicapp-general::pagetitle" matches the text "Checking out the chips"

        Scenario Outline: Ionic list testing

                When I click on the element with the text "<text>"
                Then I expect that element "ionicapp-homepage::selectedchiplabel" contains the text "<expectedvalue>"

                Examples:
                        | text             | expectedvalue |
                        | This is item #10 | build         |
                        | This is item #2  | wifi          |
                        | This is item #1  | flask         |