Feature: Test the segment buttons
    Scenario: Navigate to the OPTIONS page
        Given The app is loaded using "ionicapp-general::pagetitle"
        
        When I click on the button "ionicapp-general::options"
        # Then I wait on element "ionicapp-optionspage::castmemberList" for 4000ms to be displayed
        Then I wait for the text to be "Game of Checkboxes" in "ionicapp-general::pagetitle"

        When I scroll to element "#segmentButtons"

        When I click on the element with the text "Friends"
        # Then I wait for the text to be "friends" in "ionicapp-optionspage::segmentresultlabel"
        Then I expect that element "ionicapp-optionspage::segmentresultlabel" contains the text "friends"

        When I click on the element with the text "Enemies"
        Then I expect that element "ionicapp-optionspage::segmentresultlabel" contains the text "enemies"

        When I click on the element with the text "Cats and Dogs"
        Then I expect that element "ionicapp-optionspage::segmentresultlabel" contains the text "third"
