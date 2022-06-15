Feature: Cat-B Terminated feature

  Scenario:   Terminate Test with Code 5
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-20654335"
    And I complete the waiting room declaration page
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "B"
      | eyesightTest            | pass             |
      | tellMeQuestion          | T1 - Brakes      |
      | tellMeQuestionFault     | correct          |
      | vehicleRegNum           | vehreg           |
      | transmission            | manual           |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "B"
    And I add "1" serious fault to the "des-test-report-screen::competency-btn-accelarator" field
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-terminate-test-btn"
    And I wait on element "des-debrief-screen::test-outcome-terminated" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-terminated" is displayed
    And I check from a data table the number of faults are correct
      | faultSelector                                                 | faultExpectedText                | faultCountSelector                                                 | numberOfFaults      |
      | des-debrief-screen::control-accelerator-serious-fault         | Control - Accelerator            | des-debrief-screen::control-accelerator-driver-serious-count       | S                   |
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the element "des-post-debrief-screen::continue-btn"
    And I complete the terminated final outcome screen from a data table
      | activityCode                  | des-final-outcome-screen::activity-code-5   |
      | d255                          | na                                          |
      | testLanguage                  | na                                          |
      | debriefWitnessed              | yes                                         |
    And I check the confirmation page details from a data table
      | testOutcome           | Unsuccessful                                               |
      | activityCode          | 5 - Fail candidate chose to stop test: Already failed      |
      | testCategory          | B                                                          |
      | provLicenceRecieved   | na                                                         |
      | transmission          | na                                                         |
      | d255                  | No                                                         |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I complete the Office unsuccessful page from a data table
      | activityCode            | NA                                          |
      | routeNumber             | 50                                          |
      | independentDriving      | sat nav                                     |
      | trueLikeness            | no                                          |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | showMeQuestion          | S1 - Rear windscreen                        |
      | weatherCondition        | 1 - Bright / dry roads                      |
      | faultComment            | Commenting on faults, there were a some.    |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect that element "#activity-code-20654335" matches the text "5"
    And I click on the button "des-my-journal::journal-back-button"
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
