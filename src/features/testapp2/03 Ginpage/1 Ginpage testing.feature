Feature: Navigate to the gin page and test the toggles
    Background: Navigate to the GIN page
        Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::gin"
    Scenario:
        Then I wait for the text to be "Gin" in "ionicapp-general::pagetitle"
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Gin"

    Scenario: Click the action sheet button
        When I click on the button "ionicapp-ginpage::showmeaction"
        Then I click on the button with the text "Hide"
        Then the element "ionicapp-ginpage::actionresultlabel" matches the text "Hide"

    Scenario: Click the action sheet button by example table
        When I click on the button "ionicapp-ginpage::showmeaction"
        When I click the action button with the text "<buttontext>"
        Then the element "ionicapp-ginpage::actionresultlabel" matches the text "<expectedvalue>"
        And I expect that element "ionicapp-ginpage::actionresultlabel" has the class "<expectedclass>"
        Then I expect that the css attribute "background-color" from element "ionicapp-ginpage::actionresultlabel" is "<expectedcolor>"

        Examples:
            | buttontext     | expectedvalue | expectedclass     | expectedcolor   |
            | Share          | Share         | ion-color-primary | rgba(0,0,0,0)   |
            | Drink          | Drink         | ion-color-primary | rgba(0,0,0,0)   |
            | Hide           | Hide          | ion-color-primary | rgba(0,0,0,0)   |
            | Another Button | Mr Developer  | ion-color-primary | rgba(0,0,0,0)   |
            | Throw it       | Throw it      | ion-color-danger  | rgba(0,0,0,0)   |