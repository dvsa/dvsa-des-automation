Feature: Cat-B Terminated feature

  Scenario:   Terminate Test Waiting Room to Car
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
    And I click on the button "des-dashboard::my-journal-btn"
    And I start the test for "20654335"
    And I complete the waiting room declaration page
    And I complete the candidate ID page from a data table
      | trueLikeness            | No              |
    And I complete the waiting room communication page
    And I click on the button "des-waiting-room-to-car::end-test-btn"
    And I click on the button "des-waiting-room-to-car::terminate-test-btn"
    And I expect that element "des-debrief-screen::test-outcome-terminated" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the element "des-post-debrief-screen::continue-btn"
    And I complete the terminated final outcome screen from a data table
      | activityCode                  | des-final-outcome-screen::activity-code-27  |
      | d255                          | na                                          |
      | testLanguage                  | na                                          |
      | debriefWitnessed              | yes                                         |
    And I check the confirmation page details from a data table
      | testOutcome           | Terminated                                                 |
      | activityCode          | 27 - Language issues                                       |
      | testCategory          | B                                                          |
      | provLicenceReceived   | na                                                         |
      | transmission          | na                                                         |
      | d255                  | No                                                         |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I complete the Office unsuccessful page from a data table
      | activityCode            | NA                                          |
      | routeNumber             | 50                                          |
      | independentDriving      | sat nav                                     |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | showMeQuestion          | S1 - Rear windscreen                        |
      | weatherCondition        | 1 - Bright / dry roads                      |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect the activity code "20654335" matches the text "27"
    And I click on the button "des-general::back-btn"
    And I sign out
