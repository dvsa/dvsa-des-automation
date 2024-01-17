Feature: Cat-Mod2 Successful feature

  Scenario:   Successful Mod2 with no faults
    Given I am signed in as a random "desexaminera" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000000"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "10123433"
    And I complete the waiting room declaration page
    And I complete the auth page
    And I complete the candidate ID page from a data table
      | trueLikeness            | yes              |
    And I complete the waiting room communication page
    And I complete the auth page
    And I complete the waiting room to car page from a data table for a category "mod2"
      | categorytype            | AM Moped                      |
      | transmission            | Automatic                     |
      | eyesightTest            | pass                          |
      | vehicleregnum           | autopck                        |
      | safetyQuestion1         | M1 - Oil level                |
      | safetyQuestion2         | M7 - Steering                 |
      | balanceQuestion1        | B2 - Carrying a passenger     |
      | safetyQuestion1Fault    | correct                       |
      | safetyQuestion2Fault    | correct                       |
      | balanceQuestion1Fault   | correct                       |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "mod2"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-passed" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I complete the successful final outcome screen from a data table
      | passCertNumber                | A123456X        |
      | transmission                  | automatic       |
      | licenceReceived               | yes             |
      | testLanguage                  | NA              |
      | d255                          | yes             |
      | debriefWitnessed              | No              |
    And I complete the health declaration page for a category "mod2"
    And I complete the auth page
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                                            |
      | activityCode          | 1 - Pass                                                          |
      | testCategory          | EUAMM2                                                            |
      | provLicenceReceived   | Yes - Please retain the candidates licence.                        |
      | transmission          | Automatic - An automatic licence issued                           |
      | d255                  | Yes - Please complete a D255.                                      |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I complete the Office page from a data table
      | routeNumber             | 5                    |
      | testConducted           | car to bike          |
      | independentDriving      | traffic signs        |
      | identification          | photo card           |
      | weatherCondition        | 10 - Windy           |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect the activity code "10123433" matches the text "1"
    And I click on the button "des-general::back-btn"
    And I sign out
