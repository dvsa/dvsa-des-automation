Feature: Cat-B Terminate Waiting Room Declaration feature

  Scenario:   Unsuccessful terminated  waiting room declaration
   Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-20654334"
    And I click on the button "des-general::end-test-btn"
    And I click on the button "des-general::terminate-test-btn"
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the button "des-post-debrief-screen::continue-btn"
    And I complete the terminated final outcome screen from a data table
      | activityCode                  | des-final-outcome-screen::activity-code-21  |
      | d255                          | na                                          |
      | testLanguage                  | na                                          |
    And I check the confirmation page details from a data table
      | testOutcome           | Terminated                                               |
      | activityCode          | 21 - Vehicle / gear not suitable or no vehicle for test  |
      | testCategory          | B                                                         |
      | provLicenceRecieved   | na                                                        |
      | transmission          | na                                                        |
      | d255                  | No                                                        |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I complete the Office unsuccessful page from a data table
      | routeNumber             | na                                          |
      | independentDriving      | na                                   |
      | trueLikeness            | yes                                         |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | weatherCondition        | 1 - Bright / dry roads                      |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect that element "#activity-code-20654334" matches the text "21"
    And I click on the button "des-general::back-btn"
    And I sign out
