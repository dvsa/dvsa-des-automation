Feature: Cat-H Home Unsuccessful feature

  Scenario:   Unsuccessful Cat-H Home with 16 driving faults
    Given I am signed in as a random "desexaminerbe" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000012"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-22123411"
    And I complete the waiting room declaration page
    And I complete the candidate ID page from a data table
      | trueLikeness            | yes              |
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "home"
      | eyesightTest            | pass                                |
      | showMeQuestion          | H1 - Direction indicators           |
      | tellMeQuestion          | H14 - Windscreen washer reservoir   |
      | showMeQuestionFault     | correct                             |
      | tellMeQuestionFault     | correct                             |
      | vehicleRegNum           | vehreg                              |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "home"
    And I add "16" driving faults to the "des-test-report-screen::competency-btn-accelarator" field
    And I expect that container "des-test-report-screen::driving-fault-counter" contains the text "16"
    And I click on the button "des-test-report-screen::end-test-btn-xpath"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-failed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-failed" is displayed
    And I check from a data table the number of faults are correct
      | faultSelector                                                 | faultExpectedText                | faultCountSelector                                         | numberOfFaults      |
      | des-debrief-screen::control-accelerator-driver-fault          | Control - Accelerator            | des-debrief-screen::control-accelerator-driver-fault-count | 16                  |
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the element "#continue-to-non-pass-finalisation"
    And I complete the unsuccessful final outcome screen from a data table
      | d255                          | na              |
      | testLanguage                  | na              |
      | debriefWitnessed              | yes             |
    And I check the confirmation page details from a data table
      | testOutcome           | Unsuccessful                                |
      | activityCode          | 2 - Fail                                    |
      | testCategory          | H                                           |
      | provLicenceReceived   | na                                          |
      | transmission          | na                                          |
      | d255                  | No                                          |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I complete the Office unsuccessful page from a data table
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | weatherCondition        | 10 - Windy                                  |
      | faultComment            | Not good                                    |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect that element "#activity-code-22123411" matches the text "2"
    And I click on the button "des-general::back-btn"
    And I sign out
