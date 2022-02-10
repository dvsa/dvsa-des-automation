Feature: Dashboard feature

  Scenario:  LDTM Dashboard Page Scenario
    Given I pause for 1000ms
    When I wait on element "des-dashboard::page-title" to be displayed
    Then I expect that element "des-dashboard::page-title" matches the text "My dashboard"
    And I expect that element "des-dashboard::username-header" matches the text "MESBeta User 1"
    And I expect that element "des-dashboard::user-classification" matches the text "Local Driving Test Manager"
    And I expect that element "des-dashboard::staff-number" matches the text "1234567"
    And I expect that element "#go-to-journal-button" is displayed
    And I expect that element "#test-centre-journal-button" is displayed
    And I expect that element "#completed-search-button" is displayed
    And I expect that element "#rekey-search-button" is displayed
    And I expect that element "#practice-mode-test-report-button" is displayed
    And I expect that element "#practice-mode-full-button" is displayed
    And I pause for 10000ms


##### The below scenario can be enabled when Delegated Examiner is being developed
#  Scenario:  Delegated Examiner Dashboard Page Scenario
#    Given I pause for 1000ms
#    When I wait on element "des-dashboard::page-title" to be displayed
#    Then I expect that element "des-dashboard::page-title" matches the text "My dashboard"
#    And I expect that element "des-dashboard::username-header" matches the text "TST DES DelegatedExaminer DEV 1"
#    And I expect that element "des-dashboard::user-classification" matches the text "Admin Team"
#    And I expect that element "#go-to-journal-button" is displayed
#    And I expect that element "#completed-search-button" is displayed
#    And I expect that element "#rekey-search-button" is displayed
#    And I expect that element "#practice-mode-test-report-button" is displayed
#    And I expect that element "#practice-mode-full-button" is displayed
#    And I pause for 10000ms
#
