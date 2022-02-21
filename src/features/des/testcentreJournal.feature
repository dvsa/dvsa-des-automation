Feature: Test Centre Journal

    Background:  Optional background step
    
    @test
    Scenario: Navigate to Test Centre Journal
        # Given I am signed in as a random "mobexaminer1" user
        When I wait on element "des-dashboard::page-title" to be displayed
        Then I wait on element "#test-centre-journal-button" to be displayed
        When I click on the element "#test-centre-journal-button"
        Then I wait on element "#test-title" to be displayed
        Then I expect that element "#test-title" matches the text "Candidate search"
        And I expect that element "#test-centre-location" matches the text "Example Test Centre"
        And I add "Alice Cooper" to the inputfield "#typeahead-prevent-manual-entry"
        And I click on the button with the text "Alice Cooper"
        And I wait on element "#show-booking-button-text" to be enabled
        And I click on the element "#show-booking-button-text"
        And I pause for 3000ms
        And I expect that element "#candidate-no-booking-at-test-centre-today-message" matches the text "This candidate does not have a booking at Example Test Centre for today."
        And I pause for 3000ms
        Then the candidates test details are shown for tommorow
            | testCentre          | Example Test Centre   |
            | candidateName       | Miss Alice Cooper     |
            | testTime            | 09:07                 |
            | candidateReference  | COOPE015220A99HC      |
            | testCategory        | B                     |
            | examinerName        |  Test Examiner One    |




# And the candidate details are correct in the card (name, time, test centre, category, examiner)




    # https://jira.dvsacloud.uk/secure/RapidBoard.jspa?rapidView=1174&projectKey=MES&quickFilter=4989
