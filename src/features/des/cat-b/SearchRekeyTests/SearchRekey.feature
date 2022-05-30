Feature: Cat-B Search Rekey feature

  Scenario:   Search Rekey
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
    And I click on the button "des-dashboard::rekey-test-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I wait on element "des-rekey-search-page::page-title" to be displayed
    And I scroll to element "des-rekey-search-page::application-ref-text"
    And I add "12345633019" to the inputfield "des-rekey-search-page::application-ref-text"
    And I scroll to element "des-rekey-search-page::staff-number-text"
    And I add "1234567" to the inputfield "des-rekey-search-page::staff-number-text"  
    And I click on the element "des-rekey-search-page::rekey-search-test-btn"
    And I click on the element "des-rekey-search-page::rekey-search-test-btn"
    And I wait on element "des-rekey-search-page::rekey-results-container" to be displayed
    And I expect that element "des-rekey-search-page::result-time-text" matches the text "09:07"
    And I expect that element "des-rekey-search-page::result-name-text" matches the text "Mrs Carly Doe"
    And I expect that element "des-rekey-search-page::result-category-text" matches the text "B"
    And I click on the element "des-rekey-search-page::result-rekey-btn"
    And I wait on element "des-exam-waiting-room::insurance-declaration-label" to be displayed