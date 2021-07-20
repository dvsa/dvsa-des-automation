Feature: Homepage - Popovers and selectors
    Scenario: Select an item popover
        # Given The app has rendered
        # Given The app is loaded using "ionicapp-general::pagetitle"
        When I wait on element "ionicapp-general::home" for 2000ms to exist
        When I click on the button "ionicapp-general::home"
        When I wait on element "ionicapp-homepage::gaming" for 2000ms to exist
        And I click on the button "ionicapp-homepage::gaming"

        Then I wait on element "//ion-select-popover" for 2000ms to be displayed

        Then I click on the ionic-popoveritem with the text "<optiontext>"
        Then I expect that element "ionicapp-homepage::gaming" matches the text "<expectedvalue>"

        Examples:
            | optiontext   | expectedvalue |
            | NES          | NES           |
            | PlayStation  | PlayStation   |
            | SNES         | SNES          |
            | Sega Genesis | Sega Genesis  |
            | Sega Saturn  | Sega Saturn   |
            | XBox         | XBox          |

# Then I pause for 5000ms

