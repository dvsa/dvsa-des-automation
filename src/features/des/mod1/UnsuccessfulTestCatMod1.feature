Feature: Cat-Mod1 Unsuccessful feature

  Scenario:   Unsuccessful Mod1 by not meeting requirements
    Given I am signed in as a random "desexaminera" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000000"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-10123400"
    And I complete the waiting room declaration page
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "mod1"
      | categorytype            | AM Moped                      |
      | transmission            | Manual                        |
      | vehicleregnum           | vehreg                        |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-first-emergency-stop-input"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-second-emergency-stop-input"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-first-avoidance-stop-input"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-second-avoidance-stop-input"
    And I click and hold on the element "des-test-report-screen::mod-one-emergency-stop-not-met" for "100"ms
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::mod-one-end-test-now-button"
    And I wait on element "des-debrief-screen::test-outcome-failed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-failed" is displayed
    And I check from a data table the number of faults are correct
      | faultSelector                                                 | faultExpectedText                           | faultCountSelector                                            | numberOfFaults      |
      | des-debrief-screen::speed-check-emergency-serious-text        | Emergency stop - Speed requirement not met  | des-debrief-screen::serious-fault-count                       | 1                   |
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the element "des-debrief-screen::continue-non-pass-final-btn"
    When I wait on element "des-final-outcome-screen::page-title-non-pass" to be displayed
    And I complete the unsuccessful final outcome screen from a data table
      | d255                          | na              |
      | testLanguage                  | na              |
      | debriefWitnessed              | yes             |
    And I check the confirmation page details from a data table
      | testOutcome           | Unsuccessful                                 |
      | activityCode          | 4 - Fail in the interests of public safety   |
      | testCategory          | EUAMM1                                       |
      | provLicenceRecieved   | na                                           |
      | transmission          | na                                           |
      | d255                  | No                                           |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I complete the Office unsuccessful page from a data table
      | circuit                 | right                                       |
      | trueLikeness            | no                                          |
      | distinguishingFeatures  | Red shirt, blue shoes, long hair.           |
      | identification          | photo card                                  |
      | weatherCondition        | 10 - Windy                                  |
      | faultComment            | Commenting on faults, there were a some.    |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I scroll to element "#activity-code-10123400"
    And I expect that element "#activity-code-10123400" matches the text "4"
    And I click on the button "des-my-journal::journal-back-button"
    And I sign out
