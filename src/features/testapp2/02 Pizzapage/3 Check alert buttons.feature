Feature: Check alert buttons
        Scenario: Navigate to the second tab and check the alert button
                Given The app is loaded using "ionicapp-general::pagetitle"
                When I click on the button "ionicapp-general::pizza"
                Then I wait for the text to be "Checking out the chips" in "ionicapp-general::pagetitle"
                When I click on the ionic-button with the text "OK Prompt"
                When I click the ionic-alert button with the text "OK"
                # And I pause for 2000ms