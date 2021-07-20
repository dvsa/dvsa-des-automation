Feature: Homepage - Use the generic steps to fill in a field
    Scenario: Use the generic steps to fill in a field
        Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::home"
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Automation Training"
        When I add 10 random characters to the inputfield "ionicapp-homepage::firstname"
        ## This step should work for ionic text boxes
        Then I expect that element "ionicapp-homepage::firstname" contains any text
        Then I expect that ionic-textbox "ionicapp-homepage::firstname" contains any text
        When I add "carter" to the inputfield "ionicapp-homepage::lastname"
        Then I expect that ionic-textbox "ionicapp-homepage::lastname" contains any text
        When I set "27/03/1974" to the ionic date field "ionicapp-homepage::dateofbirth"
        When I add "46" to the inputfield "ionicapp-homepage::age"
        When I add "leecarter@meeeeee.com" to the inputfield "ionicapp-homepage::email"
        When I scroll to element "#submitButton"
        When I add "pewpewpewpewpewpewpewpewpewpewpewpewpewpewpewpew" to the inputfield "ionicapp-homepage::aboutme"
