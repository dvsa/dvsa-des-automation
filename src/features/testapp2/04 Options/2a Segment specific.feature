Feature: Test the segment buttons
    Scenario: Navigate to the OPTIONS page
        Given The app is loaded using "ionicapp-general::pagetitle"
        
        When I click on the button "ionicapp-general::options"
        Then I wait for the text to be "Game of Checkboxes" in "ionicapp-general::pagetitle"

        When I scroll to element "#segmentButtons"

        When I click the ionic-segment-button "#segmentButtons" with the text "Friends"
        Then I expect that element "ionicapp-optionspage::segmentresultlabel" contains the text "friends"

        When I click the ionic-segment-button "#segmentButtons" with the text "Enemies"
        Then I expect that element "ionicapp-optionspage::segmentresultlabel" contains the text "enemies"

        When I click the ionic-segment-button "#segmentButtons" with the text "Cats and Dogs"
        Then I expect that element "ionicapp-optionspage::segmentresultlabel" contains the text "third"
