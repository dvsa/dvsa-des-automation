
Feature: Navigate to the gin page and test the toggles
    Background: Navigate to the GIN page
        Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::gin"
    Scenario:
        Then I wait for the text to be "Gin" in "ionicapp-general::pagetitle"
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Gin"
        When I set the ionic-toggle thats inside "ionicapp-ginpage::ginlist" with the text "blueberry" off
        Then I expect the ionic-toggle thats inside "ionicapp-ginpage::ginlist" with the text "blueberry" to be off
        When I set the ionic-toggle thats inside "//ion-list[@id='ginList']" with the text "blueberry" on
        Then I expect the ionic-toggle thats inside "//ion-list[@id='ginList']" with the text "blueberry" to be on