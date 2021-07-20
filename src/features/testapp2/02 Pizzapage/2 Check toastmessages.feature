Feature: Check toast messages
        Scenario: Navigate to the second tab
                Given The app is loaded using "ionicapp-general::pagetitle"
                When I click on the button "ionicapp-general::pizza"
                Then I wait for the text to be "Checking out the chips" in "ionicapp-general::pagetitle"
                Then I click on the ionic-button with the text "Lets get toasty"
                Then I expect the ionic-toast message to contain the text "Toast"
                Then I click on the ionic-button with the text "OK Prompt"
                When I click the ionic-alert button with the text "OK"
                And I pause for 2000ms
