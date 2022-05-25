Feature: Cat-C Successful feature

  Scenario:   Successful test with 15 faults
    Given I am signed in as a random "mobexaminer3" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "28371932"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-32345633"
    And I complete the waiting room Cat C declaration page
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "C"
      | vehicleRegNum            | vehreg                             |
      | showMeQuestion1          | Q1 - All doors secure              |
      | showMeQuestion2          | Q2 - Air leaks                     |
      | showMeQuestion3          | Q13 - Check audible warnings       |
      | tellMeQuestion1          | Q3 - Safety factors while loading  |
      | tellMeQuestion2          | Q16 - Engine coolant               |
      | showMeQuestion1Fault     | correct                            |
      | showMeQuestion2Fault     | correct                            |
      | showMeQuestion3Fault     | correct                            |
      | tellMeQuestion1Fault     | correct                            |
      | tellMeQuestion2Fault     | correct                            |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "C"
    And I add "5" driving faults to the "des-test-report-screen::competency-btn-accelarator" field
    And I expect that container "des-test-report-screen::driving-fault-counter" contains the text "5"
    And I add "5" driving faults to the "des-test-report-screen::competency-btn-safety" field
    And I expect that container "des-test-report-screen::driving-fault-counter" contains the text "10"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I check from a data table the number of faults are correct
      | faultSelector                                                 | faultExpectedText                | faultCountSelector                                         | numberOfFaults      |
      | des-debrief-screen::control-accelerator-driver-fault          | Control - Accelerator            | des-debrief-screen::control-accelerator-driver-fault-count | 5                   |
      | des-debrief-screen::move-off-safety-fault                     | Move off - Safety                | des-debrief-screen::move-off-safety-fault-count            | 5                   |
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I complete the successful final outcome screen from a data table
      | provisionalLicenceReceived    | Yes              |
      | transmission                  | ManualCatC       |
      | passCertNumber                | A123456X         |
      | d255                          | NA               |
      | testLanguage                  | NA               |
      | debriefWitnessed              | Yes              |
      | code78                        | Yes              |
    And I wait on element "des-final-pass-declaration-screen::page-title" to be displayed
    And I complete the health declaration page
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                      |
      | activityCode          | 1 - Pass                                    |
      | testCategory          | C                                           |
      | provLicenceRecieved   | Yes - Please retain the candidates licence  |
      | transmission          | Manual                                      |
      | d255                  | No                                          |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I complete the Office page from a data table
      | activityCode            | NA                                          |
      | routeNumber             | 2                                           |
      | independentDriving      | traffic signs                               |
      | trueLikeness            | yes                                         |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | weatherCondition        | 1 - Bright / dry roads                      |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect that element "#activity-code-32345633" matches the text "1"
    And I click on the button "des-my-journal::journal-back-button"
    And I expect that container "des-dashboard::staff-number" contains the text "28371932"
