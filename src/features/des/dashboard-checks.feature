@test
Feature: Dashboard Checks feature

 Background:
   Given I am signed in as a random "mobexaminer1" user

  Scenario:  Check staff name, number and role
    When I wait on element "des-dashboard::page-title" to be displayed
    Then I wait on element "des-dashboard::staff-number" to be displayed
    Then I wait on element "des-dashboard::examiner-name" to be displayed
    Then I wait on element "des-dashboard::examiner-role" to be displayed
    Then I click on the button "des-dashboard::my-journal-card"
    And I click on the button "des-general::back-btn"
    Then I click on the button "des-dashboard::centre-journal-btn"
    And I click on the button "des-general::back-btn"
    Then I click on the button "des-dashboard::search-completed-tests-btn"
    And I click on the button "des-general::back-btn"
    Then I click on the button "des-dashboard::rekey-test-btn"
    And I click on the button "des-general::back-btn"
    Then I click on the button "des-dashboard::partial-practise-mode-btn"
    And I click on the button "des-dashboard::practice-modal-cancel"
    Then I click on the button "des-dashboard::full-practise-mode-btn"




