@focus
Feature: Add data to new textbox
    Scenario:
        Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::other"
        Then I wait for the text to be "Other Stuff" in "ionicapp-general::pagetitle"
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Other Stuff"
        Then I add 10 random characters to the inputfield "#newTextBox input"
        Then I set "Hello There" to the inputfield "ionicapp-otherpage::newtextbox"
        Then I add "Hello There2" to the inputfield "#newTextBox input"
