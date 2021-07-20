@focus
Feature: Navigate to the other page
    Scenario:

        Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::other"
        Then I wait for the text to be "Other Stuff" in "ionicapp-general::pagetitle"
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Other Stuff"
        When I pause for 1000ms
        Then I swipe right on "#swipeLeftLabel"
        Then I pause for 4000ms