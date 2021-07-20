Feature: Check alert buttons
        Scenario: Navigate to the second tab and check the alert button
                Given The app is loaded using "ionicapp-general::pagetitle"
                When I click on the button "ionicapp-general::options"
                Then I wait for the text to be "Game of Checkboxes" in "ionicapp-general::pagetitle"
                Then I expect the ionic-badge "#badge" to contain the text "99"
