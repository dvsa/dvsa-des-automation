Feature: Cat-Mod1 Successful feature

  Scenario:   Successful Mod1 with no faults
    Given I am signed in as a random "desexaminera" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000000"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "10123400"
    And I complete the waiting room declaration page
    And I complete the candidate ID page from a data table
      | trueLikeness            | yes              |
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "mod1"
      | categorytype            | AM Moped                      |
      | transmission            | Manual                        |
      | vehicleregnum           | autopck                        |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-first-emergency-stop-input"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-second-emergency-stop-input"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-first-avoidance-stop-input"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-second-avoidance-stop-input"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-passed" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I complete the successful final outcome screen from a data table
      | passCertNumber                | A12345X         |
      | transmission                  | automatic       |
      | testLanguage                  | NA              |
      | d255                          | yes             |
      | debriefWitnessed              | No              |
    And I complete the health declaration page for a category "mod1"
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                                            |
      | activityCode          | 1 - Pass                                                          |
      | testCategory          | EUAMM1                                                            |
      | provLicenceReceived   | No - Please ensure that the licence is kept by the candidate      |
      | transmission          | Automatic - An automatic licence issued                           |
      | d255                  | Yes - Please complete a D255                                      |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I complete the Office page from a data table
      | circuit                 | left                    |
      | identification          | photo card              |
      | weatherCondition        | 10 - Windy              |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect the activity code "10123400" matches the text "1"
    And I click on the button "des-general::back-btn"
    And I sign out
