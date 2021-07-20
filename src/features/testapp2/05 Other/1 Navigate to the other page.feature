Feature: Navigate to the other page
    Scenario:
        Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::other"
        Then I wait for the text to be "Other Stuff" in "ionicapp-general::pagetitle"
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Other Stuff"
        Then I expect the ionic-card "#card_0" header to contain the text "Bruce Lee"
        Then I expect the ionic-card "#card_0" content to contain the text "Use only that which works"

