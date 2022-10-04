Feature: Cat-Mod2 Unsuccessful feature

  Scenario:   Unsuccessful Mod2 with 1 dangerous fault
    Given I am signed in as a random "desexaminera" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000000"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-10123433"
    And I complete the waiting room declaration page
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "mod2"
      | categorytype            | AM Moped                      |
      | transmission            | Automatic                     |
      | eyesightTest            | pass                          |
      | vehicleregnum           | vehreg                        |
      | safetyQuestion1         | M1 - Oil level                |
      | safetyQuestion2         | M7 - Steering                 |
      | balanceQuestion1        | B2 - Carrying a passenger     |
      | safetyQuestion1Fault    | correct                       |
      | safetyQuestion2Fault    | correct                       |
      | balanceQuestion1Fault   | correct                       |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "mod2"
    And I add "1" dangerous faults to the "des-test-report-screen::competency-btn-clutch" field
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-failed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-failed" is displayed
    And I check from a data table the number of faults are correct
      | faultSelector                                                 | faultExpectedText                | faultCountSelector                                            | numberOfFaults      |
      | des-debrief-screen::control-clutch-dangerous-fault            | Control - Clutch                 | des-debrief-screen::dangerous-fault-count                     | 1                   |
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the element "des-debrief-screen::continue-non-pass-final-btn"
    When I wait on element "des-final-outcome-screen::page-title-non-pass" to be displayed
    And I complete the unsuccessful final outcome screen from a data table
      | d255                          | na              |
      | testLanguage                  | na              |
      | debriefWitnessed              | yes             |
    And I check the confirmation page details from a data table
      | testOutcome           | Unsuccessful                                 |
      | activityCode          | 2 - Fail                                     |
      | testCategory          | EUAMM2                                       |
      | provLicenceRecieved   | na                                           |
      | transmission          | na                                           |
      | d255                  | No                                           |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I complete the Office unsuccessful page from a data table
      | routeNumber             | 5                                           |
      | testConducted           | car to bike                                 |
      | independentDriving      | traffic signs                               |
      | trueLikeness            | yes                                         |
      | identification          | photo card                                  |
      | weatherCondition        | 10 - Windy                                  |
      | faultComment            | Commenting on faults, there were a some.    |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I scroll to element "#activity-code-10123433"
    And I expect that element "#activity-code-10123433" matches the text "2"
    And I click on the button "des-my-journal::journal-back-button"
    And I sign out
