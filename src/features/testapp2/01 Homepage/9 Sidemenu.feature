Feature: Homepage - Side menu
    # Scenario: Check the popout menu
    #     Given The app is loaded using "ionicapp-general::pagetitle"
    #     When I click on the button "ionicapp-general::home"
    #     When I wait on element "ionicapp-sidemenu::burgerbutton" for 2000ms to exist

    #     When I click on the element "ionicapp-sidemenu::burgerbutton"
    #     Then I wait on element "ionicapp-sidemenu::menutitle" for 2000ms to be displayed

    #     # Then I wait for the "ionicapp-sidemenu::menutitle" menu to show
    #     When I click away from the ionic-menu "ionicapp-sidemenu::menutitle"
    #     Then I wait for the "ionicapp-sidemenu::menutitle" menu to hide

    Scenario Outline: Get to the <menuitem> page
        And The app has rendered
        # Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::home"
        Then I wait on element "ionicapp-sidemenu::burgerbutton" for 2000ms to be displayed

        When I click on the element "ionicapp-sidemenu::burgerbutton"
        Then I wait for the "ionicapp-sidemenu::menutitle" menu to show
        Then I click on the ionic-item with the text "<menuitem>"
        Then I wait for the "ionicapp-sidemenu::menutitle" menu to hide

        # And The app has rendered
        Then I wait for the text to be "<pagetitle>" in "ionicapp-general::pagetitle"
        Then I expect that element "ionicapp-general::pagetitle" matches the text "<pagetitle>"
        
        Examples:
            | menuitem | pagetitle              |
            | Pizza    | Checking out the chips |
            | Gin      | Gin                    |
            | Options  | Game of Checkboxes     |
            | Search   | Search                 |


