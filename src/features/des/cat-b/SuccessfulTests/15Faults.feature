Feature: Cat-B Successful feature

  Scenario:   Successful test with 15 faults
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "20654334"
    And I complete the waiting room declaration page
    And I complete the candidate ID page from a data table
      | trueLikeness            | no               |
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "B"
      | eyesightTest            | pass             |
      | tellMeQuestion          | T1 - Brakes      |
      | tellMeQuestionFault     | correct          |
      | vehicleRegNum           | autopck           |
      | transmission            | manual           |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "B"
    And I add "5" driving faults to the "des-test-report-screen::competency-btn-accelarator" field
    And I expect that container "des-test-report-screen::driving-fault-counter" contains the text "5"
    And I add "5" driving faults to the "des-test-report-screen::competency-btn-safety" field
    And I expect that container "des-test-report-screen::driving-fault-counter" contains the text "10"
    And I add "5" driving faults to the "des-test-report-screen::competency-btn-signalling" field
    And I expect that container "des-test-report-screen::driving-fault-counter" contains the text "15"
    And I click on the button "des-test-report-screen::end-test-btn-xpath"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-passed" is displayed
    And I check from a data table the number of faults are correct
      | faultSelector                                                 | faultExpectedText                | faultCountSelector                                         | numberOfFaults      |
      | des-debrief-screen::control-accelerator-driver-fault          | Control - Accelerator            | des-debrief-screen::control-accelerator-driver-fault-count | 5                   |
      | des-debrief-screen::move-off-safety-fault                     | Move off - Safety                | des-debrief-screen::move-off-safety-fault-count            | 5                   |
      | des-debrief-screen::use-of-mirrors-signalling-fault           | Use of mirrors - Signalling      | des-debrief-screen::use-of-mirrors-signalling-fault-count  | 5                   |
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I complete the successful final outcome screen from a data table
      | provisionalLicenceReceived    | Yes              |
      | transmission                  | Manual           |
      | passCertNumber                | A123456X         |
      | d255                          | NA               |
      | testLanguage                  | NA               |
      | debriefWitnessed              | Yes              |
    And  I complete the health declaration page for a category "B"
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                      |
      | activityCode          | 1 - Pass                                    |
      | testCategory          | B                                           |
      | provLicenceReceived   | Yes - Please retain the candidates licence.  |
      | transmission          | Manual                                      |
      | d255                  | No                                          |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I complete the Office page from a data table
      | activityCode            | NA                                          |
      | routeNumber             | 2                                           |
      | independentDriving      | sat nav                                     |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | showMeQuestion          | S1 - Rear windscreen                        |
      | weatherCondition        | 1 - Bright / dry roads                      |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect the activity code "20654334" matches the text "1"
    And I click on the button "des-general::back-btn"
    And I sign out
