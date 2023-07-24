Feature: Cat-Mod1 Successful feature

  Scenario:   Check validation on all pages
    Given I am signed in as a random "desexaminera" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000000"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "10123400"
    And I click on the button "des-general::continue-btn"
    And the element "des-exam-waiting-room::insurance-declaration-unchecked-validation-message" is displayed
    And the element "des-exam-waiting-room::residency-declaration-unchecked-validation-message" is displayed
    And the element "des-exam-waiting-room::signature-pad-validation-message" is displayed
    And I complete the waiting room declaration page
    And I click on the button "des-candidate-licence-page::continue-button"
    And the element "des-candidate-licence-page::candidate-true-likeness-validation-message" is displayed
    And I complete the candidate ID page from a data table
      | trueLikeness            | no              |
    And I click on the element "des-comms-screen::new-email-radio-btn"
    And I click on the button "des-comms-screen::continue-btn"
    And the element "des-comms-screen::new-email-error-msg" is displayed
    And I complete the waiting room communication page
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And the element "des-waiting-room-to-car::confirm-cat-type-validation-msg" is displayed
    And the element "des-waiting-room-to-car::transmission-type-validation-error-msg" is displayed
    And the element "des-waiting-room-to-car::vehicle-registration-validation-error-msg" is displayed
    And I complete the waiting room to car page from a data table for a category "mod1"
      | categorytype            | A1 Motorcycle                      |
      | transmission            | Automatic                          |
      | vehicleregnum           | autopck                            |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I wait on element "des-test-report-screen::page-title" to be displayed
    And I click on the button "des-test-report-screen::end-test-btn"
    And I wait on element "des-test-report-screen::legal-requirements-modal-emergency-stop-list" to be displayed
    And the element "des-test-report-screen::legal-requirements-modal-emergency-stop-list" is displayed
    And the element "des-test-report-screen::legal-requirements-modal-avoidance-stop-list" is displayed
    And I click on the element "des-test-report-screen::end-test-model-return-to-test-button"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-first-emergency-stop-input"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-second-emergency-stop-input"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-first-avoidance-stop-input"
    And I add "50" to the inputfield "des-test-report-screen::mod-one-second-avoidance-stop-input"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-passed" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the button "des-final-outcome-screen::continue-btn"
    And the element "des-final-outcome-screen::transmission-validation-msg" is displayed
    And the element "des-final-outcome-screen::pass-certificate-number-validation-msg" is displayed
    And I scroll to element "des-final-outcome-screen::debrief-witnessed-validation-msg"
    And the element "des-final-outcome-screen::debrief-witnessed-validation-msg" is displayed
    And I complete the successful final outcome screen from a data table
      | transmission                  | Manual           |
      | passCertNumber                | A12345X          |
      | d255                          | NA               |
      | testLanguage                  | NA               |
      | debriefWitnessed              | Yes              |
    And I click on the button "des-final-pass-declaration-screen::continue-btn"
    And the element "des-final-pass-declaration-screen::pass-certificate-receipt-validation-msg" is displayed
    And the element "des-final-pass-declaration-screen::signature-pad-validation-msg" is displayed
    And I complete the health declaration page for a category "mod1"
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                                            |
      | activityCode          | 1 - Pass                                                          |
      | testCategory          | EUA1M1                                                            |
      | provLicenceReceived   | No - Please ensure that the licence is kept by the candidate      |
      | transmission          | Manual                                                            |
      | d255                  | No                                                                |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I click on the button "des-office-page::mark-as-complete"
    And the element "des-office-page::circuit-validation-msg" is displayed
    And I scroll to element "des-office-page::desc-of-candidate-validation-msg"
    And the element "des-office-page::desc-of-candidate-validation-msg" is displayed
    And I scroll to element "des-office-page::weather-conditions-validation-msg"
    And the element "des-office-page::weather-conditions-validation-msg" is displayed
    And I scroll to element "des-office-page::circuit-left-input"
    And I complete the Office page from a data table
      | circuit                 | left                    |
      | distinguishingFeatures  | Looks younger           |
      | identification          | photo card              |
      | weatherCondition        | 10 - Windy              |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect the activity code "10123400" matches the text "1"
    And I click on the button "des-general::back-btn"
    And I sign out
