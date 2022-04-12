Feature: Test Centre Journal
      Scenario: Test centre Journal - Today Test
        Given I am signed in as a random "mobexaminer1" user
        When I wait on element "des-general::page-title" to be displayed
        Then I wait on element "des-dashboard::centre-journal-btn" to be displayed
        When I click on the button "des-dashboard::centre-journal-btn"
        Then I wait on element "des-test-centre-journal::test-title" to be displayed
        Then I expect that element "des-test-centre-journal::test-title" matches the text "Candidate search"
        And I expect that element "des-test-centre-journal::location-text" matches the text "Example Test Centre"
        When I add "Ali Campbell" to the inputfield "des-test-centre-journal::candidate-search-input"
        When I click on the button with the text "Ali Campbell"
        And I wait on element "des-test-centre-journal::show-booking-button" to be enabled
        And I click on the element "des-test-centre-journal::show-booking-button"
        And I expect that element "des-test-centre-journal::tomorrow-message" matches the text "This candidate does not have a booking at Example Test Centre for tomorrow."
        Then the candidates test details are shown
            | testCentre          | Example Test Centre   |
            | candidateName       | Mr Ali Campbell       |
            | testTime            | 11:30                 |
            | candidateReference  | CAMPB803120A89HC      |
            | testCategory        | B                     |
            | examinerName        | Test Examiner One     |
