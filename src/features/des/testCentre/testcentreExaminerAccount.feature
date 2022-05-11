Feature: Test Centre Journal Examiner Account not deployed into a test centre
@test
  Scenario: Test centre Journal - Today Test
    Given I am signed in as a random "mobexaminer3" user
    When I wait on element "des-general::page-title" to be displayed
    Then I wait on element "des-dashboard::centre-journal-btn" to be displayed
    When I click on the button "des-dashboard::centre-journal-btn"
    Then I wait on element "des-test-centre-journal::test-title" to be displayed
    Then I expect that element "des-test-centre-journal::test-title" matches the text "Candidate search"


