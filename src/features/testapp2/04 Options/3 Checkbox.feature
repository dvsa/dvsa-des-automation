Feature: Test the ionic checkboxes
    Scenario: Navigate to the OPTIONS page and click some checkboxes
        Given The app is loaded using "ionicapp-general::pagetitle"

        When I click on the button "ionicapp-general::options"
        Then I wait for the text to be "Game of Checkboxes" in "ionicapp-general::pagetitle"
        # When I click on the element with the text "Jon Snow"
        When I set the ionic-checkbox thats inside "ionicapp-optionspage::castmemberlist" with the text "Jon Snow" on
        Then I expect the ionic-checkbox with the text "Jon Snow" should be selected
        When I set the ionic-checkbox thats inside "ionicapp-optionspage::castmemberlist" with the text "Jon Snow" off
        Then I expect the ionic-checkbox with the text "Jon Snow" should not be selected
        # Then I pause for 1000ms