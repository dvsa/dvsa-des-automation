Feature: Test Centre Journal

  @test
  Scenario: Test centre Journal - Today Test
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-general::page-title" to be displayed
    When I click on the button "des-dashboard::centre-journal-btn"
    Then I expect that element "des-test-centre-journal::test-title" matches the text "Candidate search"
    And I expect that element "des-test-centre-journal::location-text" matches the text "Example Test Centre"
    When I add "Ali Campbell" to the inputfield "des-test-centre-journal::candidate-search-input"
    When I click on the button with the text "Ali Campbell"
    And I click on the element "des-test-centre-journal::show-booking-button"
    And I expect that element "des-test-centre-journal::tomorrow-message" matches the text "This candidate does not have a booking at Example Test Centre for tomorrow."
    Then the candidates test details are shown
      | testCentre         | Example Test Centre |
      | candidateName      | Mr Ali Campbell     |
      | testTime           | 11:30               |
      | candidateReference | CAMPB803120A89HC    |
      | testCategory       | B                   |
      | examinerName       | Test Examiner One   |
    And I click on the button "des-test-centre-journal::test-centre-journal-back-button"
    And I sign out
