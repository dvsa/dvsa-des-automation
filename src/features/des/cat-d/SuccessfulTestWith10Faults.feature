Feature: Cat-D Successful feature

  Scenario:   Successful test with 15 faults
    Given I am signed in as a random "desexaminerd" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000006"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I wait on element "#start-test-button-16123400" to be displayed
    And I click on the button "#start-test-button-16123400"
    And I click on the button "des-my-journal::start-test-modal-start-test-btn"
    And I wait on element "des-exam-waiting-room::insurance-declaration-label" to be displayed
    And I complete the waiting room Cat C or D declaration page
    And I wait on element "des-comms-screen::by-post-radio-btn" to be displayed
    And I complete the waiting room communication page
    And I wait on element "des-waiting-room-to-car::page-title" to be displayed
    And I complete the waiting room to car page from a data table for a category "D"
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
    And I wait on element "des-test-report-screen::page-title" to be displayed
    And I select all legal requirements for a category "D"
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
    And I wait on element "des-final-outcome-screen::page-title" to be displayed
    And I complete the successful final outcome screen from a data table
      | provisionalLicenceReceived    | Yes              |
      | transmission                  | ManualCatC       |
      | passCertNumber                | A123456X         |
      | d255                          | NA               |
      | testLanguage                  | NA               |
      | debriefWitnessed              | Yes              |
      | code78                        | Yes              |
    And I wait on element "des-final-pass-declaration-screen::page-title" to be displayed
    And  I complete the health declaration page for a category "D"
    And I wait on element "des-final-confirmation-screen::page-title" to be displayed
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                      |
      | activityCode          | 1 - Pass                                    |
      | testCategory          | D                                           |
      | provLicenceRecieved   | Yes - Please retain the candidates licence  |
      | transmission          | Manual                                      |
      | d255                  | No                                          |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I wait on element "des-final-confirmation-screen::submit-test-modal-title" to be displayed
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I wait on element "des-back-to-office-holding-page::continue-to-write-up-btn" to be displayed
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I wait on element "des-office-page::page-title" to be displayed
    And I complete the Office page from a data table
      | activityCode            | NA                                          |
      | routeNumber             | 2                                           |
      | independentDriving      | traffic signs                               |
      | trueLikeness            | yes                                         |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | weatherCondition        | 1 - Bright / dry roads                      |
    And I click on the button "des-office-page::mark-as-complete"
    And I wait on element "des-office-page::mark-as-complete-modal-title" to be displayed
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I wait on element "#activity-code-16123400" to be displayed
    And I expect that element "#activity-code-16123400" matches the text "1"
    And I wait on element "des-my-journal::journal-back-button" to be displayed
    And I click on the button "des-my-journal::journal-back-button"
    And I expect that container "des-dashboard::staff-number" contains the text "10000006"