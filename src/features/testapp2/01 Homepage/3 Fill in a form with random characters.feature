Feature: Homepage - Random Data Test
    Scenario: Use the generic steps to fill in a field with random data
        Given The app is loaded using "ionicapp-general::pagetitle"

        And I click on the button "ionicapp-general::home"
        And I wait on element "ionicapp-homepage::firstname" for 2000ms to exist
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Automation Training"
        When I add 10 random characters to the inputfield "ionicapp-homepage::firstname"
        And I add 10 random characters to the inputfield "ionicapp-homepage::lastname"
        Then I expect that ionic-textbox "ionicapp-homepage::firstname" contains any text
        Then I expect that ionic-textbox "ionicapp-homepage::lastname" contains any text
        When I scroll to element "#submitButton"
        When I add 10 random characters to the inputfield "ionicapp-homepage::aboutme"
     

# Then I pause for 1000ms
