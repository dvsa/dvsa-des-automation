Feature: Homepage - Popovers and selectors
    Scenario Outline: Action buttons
        Given The app is loaded using "ionicapp-general::pagetitle"
        When I click on the button "ionicapp-general::home"
        When I wait on element "ionicapp-homepage::notifications" for 2000ms to exist
        When I click on the button "ionicapp-homepage::notifications"
        When I click the action button with the text "<buttontext>"
        Then I expect that element "ionicapp-homepage::notifications" matches the text "<expectedvalue>"

        Examples:
            | buttontext      | expectedvalue |
            | Enable          | enable        |
            | Mute            | mute          |
            | Mute for a week | mute_week     |
            | Mute for a year | mute_year     |
