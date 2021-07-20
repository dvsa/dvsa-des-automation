Feature: Homepage - Check the buttons and headings
    Scenario: Click on the buttons on the tabs
        # Given I open the url "http://localhost:8100/"
        # Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::pizza"
        # When I click on the ionic-tab-button with the text "Pizza"
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Checking out the chips"
        When I click on the button "ionicapp-general::gin"
  
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Gin"
        When I click on the button "ionicapp-general::options"
        And I wait on element "ionicapp-optionspage::castmemberlist" for 2000ms to exist
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Game of Checkboxes"

        When I click on the button "ionicapp-general::search"
        And I wait on element "//ion-list" for 2000ms to exist
        Then I expect that element "ionicapp-general::pagetitle" matches the text "Search"

