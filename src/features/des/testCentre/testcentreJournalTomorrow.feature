Feature: Test Centre Journal

  Scenario: Test centre Journal - Tomorrow Test
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-general::page-title" to be displayed
    Then I wait on element "des-dashboard::centre-journal-btn" to be displayed
    When I click on the button "des-dashboard::centre-journal-btn"
    Then I wait on element "des-test-centre-journal::test-title" to be displayed
    Then I expect that element "des-test-centre-journal::test-title" matches the text "Candidate search"
    And I expect that element "des-test-centre-journal::location-text" matches the text "Example Test Centre"
    When I add "Alice Cooper" to the inputfield "des-test-centre-journal::candidate-search-input"
    And I click on the button with the text "Alice Cooper"
    And I wait on element "des-test-centre-journal::show-booking-button" to be enabled
    And I click on the element "des-test-centre-journal::show-booking-button"
    And I expect that element "des-test-centre-journal::message-today" matches the text "This candidate does not have a booking at Example Test Centre for today."
    Then the candidates test details are shown
      | testCentre         | Example Test Centre |
      | candidateName      | Miss Alice Cooper   |
      | testTime           | 09:07               |
      | candidateReference | COOPE015220A99HC    |
      | testCategory       | B                   |
      | examinerName       | Test Examiner One   |
