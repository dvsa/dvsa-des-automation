Feature: Navigate to the options page
    Scenario:
        Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::options"
        Then I wait for the text to be "Game of Checkboxes" in "ionicapp-general::pagetitle"
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Game of Checkboxes"

