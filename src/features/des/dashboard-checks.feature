Feature: Dashboard Checks feature

  Background:
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed

  Scenario:  Check staff name, number and role
    Then I wait on element "des-dashboard::staff-number" to be displayed
    Then I wait on element "des-dashboard::examiner-name" to be displayed
    Then I wait on element "des-dashboard::examiner-role" to be displayed

  Scenario:  Practice marking a test (cat B)
    Then I click on the button "des-dashboard::partial-practise-mode-btn"
  Scenario:  Practice marking a full test
    Then I click on the button "des-dashboard::full-practise-mode-btn"

  Scenario: Search for completed tests ww
    Then I click on the button "des-dashboard::search-completed-tests-btn"

  Scenario:  Rekey DVSA test ww
    Then I click on the button "des-dashboard::re-key-test-btn"

  Scenario: Go to my journal
    Then I click on the button "des-dashboard::my-journal-card"

  Scenario:  Go to test centre journal
    Then I click on the button "des-dashboard::centre-journal-btn"



