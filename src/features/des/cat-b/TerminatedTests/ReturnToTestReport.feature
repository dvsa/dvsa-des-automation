Feature: Cat-B Terminated feature

  Scenario:   Terminate Test by Returning To the test report page
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "20654335"
    And I complete the waiting room declaration page
    And I complete the auth page
    And I complete the candidate ID page from a data table
      | trueLikeness            | No              |
    And I complete the waiting room communication page
    And I complete the auth page
    And I complete the waiting room to car page from a data table for a category "B"
      | eyesightTest            | pass             |
      | tellMeQuestion          | T1 - Brakes      |
      | tellMeQuestionFault     | correct          |
      | vehicleRegNum           | autopck           |
      | transmission            | manual           |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "B"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I complete the successful final outcome screen from a data table
      | provisionalLicenceReceived    | Yes              |
      | transmission                  | Manual           |
      | passCertNumber                | A123456X         |
      | d255                          | NA               |
      | testLanguage                  | NA               |
      | debriefWitnessed              | Yes              |
    And  I complete the health declaration page for a category "B"
    And I complete the auth page
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                      |
      | activityCode          | 1 - Pass                                    |
      | testCategory          | B                                           |
      | provLicenceReceived   | Yes - Please retain the candidates licence.  |
      | transmission          | Manual                                      |
      | d255                  | No                                          |
    And I click on the button "des-final-confirmation-screen::back-to-debrief-btn"
    And I click on the element "des-debrief-screen::back-button"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-terminate-test-btn"
    And I wait on element "des-debrief-screen::test-outcome-terminated" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-terminated" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the element "des-post-debrief-screen::continue-btn"
    And I complete the terminated final outcome screen from a data table
      | activityCode                  | des-final-outcome-screen::activity-code-21  |
      | d255                          | na                                          |
      | testLanguage                  | na                                          |
    And I check the confirmation page details from a data table
      | testOutcome           | Terminated                                                |
      | activityCode          | 21 - Vehicle / gear not suitable or no vehicle for test   |
      | testCategory          | B                                                         |
      | provLicenceReceived   | na                                                        |
      | transmission          | na                                                        |
      | d255                  | No                                                        |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::return-to-journal-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect that element "#write-up-button-20654335" is displayed
    And I click on the button "#write-up-button-20654335"
    And I complete the Office unsuccessful page from a data table
      | activityCode            | NA                                          |
      | routeNumber             | NA                                          |
      | independentDriving      | NA                                          |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | showMeQuestion          | NA                                          |
      | weatherCondition        | 1 - Bright / dry roads                      |
      | faultComment            | NA                                          |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect the activity code "20654335" matches the text "21"
    And I click on the button "des-general::back-btn"
    And I sign out
