Feature: Cat-B   Unsuccessful Test Terminate Waiting Room Declaration feature
  Scenario:   Unsuccessful terminated  waiting room declaration

    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I click on the button "des-dashboard::my-journal-btn"
    And I wait on element "#start-test-button-20654334" to be displayed
    And I click on the button "#start-test-button-20654334"
    And I wait on element "des-my-journal::start-test-modal-start-test-btn" to be displayed
    And I click on the button "des-my-journal::start-test-modal-start-test-btn"
    And I wait on element "des-exam-waiting-room::insurance-declaration-label" to be displayed
    And I click on the button "des-general::end-test-btn"
    And I click on the button "des-general::terminate-test-btn"
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the button "des-post-debrief-screen::continue-btn"

    And I check the confirmation page details from a data table
      | testOutcome           | Unsuccessful                                |
      | activityCode          | 2 - Fail                                    |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I wait on element "des-final-confirmation-screen::submit-test-modal-title" to be displayed
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I wait on element "des-back-to-office-holding-page::continue-to-write-up-btn" to be displayed
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I wait on element "des-office-page::page-title" to be displayed
    And I complete the Office unsuccessful page from a data table
      | routeNumber             | 2                                           |
      | independentDriving      | sat nav                                     |
      | trueLikeness            | yes                                         |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | showMeQuestion          | S1 - Rear windscreen                        |
      | weatherCondition        | 1 - Bright / dry roads                      |
      | seriousComment          | Not done well                               |
    And I click on the button "des-office-page::mark-as-complete"
    And I wait on element "des-office-page::mark-as-complete-modal-title" to be displayed
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I wait on element "#activity-code-20654334" to be displayed
    And I expect that element "#activity-code-20654334" matches the text "2"
    And I wait on element "des-my-journal::journal-back-button" to be displayed
    And I click on the button "des-my-journal::journal-back-button"
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
