Feature: Cat-CM Successful feature

  Scenario:   Check validation on all pages
    Given I am signed in as a random "desexaminerm" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000014"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-55512302"
    And I click on the button "des-general::continue-btn"
    And the element "des-exam-waiting-room::insurance-declaration-unchecked-validation-message" is displayed
    And the element "des-exam-waiting-room::residency-declaration-unchecked-validation-message" is displayed
    And the element "des-exam-waiting-room::signature-pad-validation-message" is displayed
    And I complete the waiting room declaration page
    And I click on the button "des-candidate-licence-page::continue-button"
    And the element "des-candidate-licence-page::candidate-true-likeness-validation-message" is displayed
    And I complete the candidate ID page from a data table
      | trueLikeness            | no              |
    And I click on the button "des-comms-screen::continue-btn"
    And the element "des-comms-screen::new-email-error-msg" is displayed
    And I complete the waiting room communication page
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And the element "des-waiting-room-to-car::eyesight-validation-error-msg" is displayed
    And the element "des-waiting-room-to-car::tell-me-validation-error-msg" is displayed
    And I click on the element "des-waiting-room-to-car::tell-me-selector"
    And I click on the button with the text "T1 - Brakes"
    And I click on the element with the text "Submit"
    And the element "des-waiting-room-to-car::tell-me-answer-validation-error-msg" is displayed
    And the element "des-waiting-room-to-car::vehicle-registration-validation-error-msg" is displayed
    And the element "des-waiting-room-to-car::transmission-type-validation-error-msg" is displayed
    And I complete the waiting room to car page from a data table for a category "B"
      | eyesightTest            | pass             |
      | tellMeQuestionFault     | correct          |
      | vehicleRegNum           | vehreg           |
      | transmission            | manual           |
      | accompaniedBy           | instructor       |
      | vehicleDetails          | school car       |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I wait on element "des-test-report-screen::page-title" to be displayed
    And I click on the button "des-test-report-screen::end-test-btn"
    And I wait on element "des-test-report-screen::legal-requirements-modal-first-ns-list" to be displayed
    And the element "des-test-report-screen::legal-requirements-modal-first-ns-list" is displayed
    And the element "des-test-report-screen::legal-requirements-modal-second-ns-list" is displayed
    And the element "des-test-report-screen::legal-requirements-modal-as-list" is displayed
    And the element "des-test-report-screen::legal-requirements-modal-hs-ds-list" is displayed
    And the element "des-test-report-screen::legal-requirements-modal-manoeuvres-list" is displayed
    And the element "des-test-report-screen::legal-requirements-modal-sm-tm-list" is displayed
    And the element "des-test-report-screen::legal-requirements-modal-eco-list" is displayed
    And I click on the element "des-test-report-screen::end-test-model-return-to-test-button"
    And I select all legal requirements for a category "B"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-passed" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the button "des-final-outcome-screen::continue-btn"
    And the element "des-final-outcome-screen::provisional-licence-received-validation-msg" is displayed
    And the element "des-final-outcome-screen::transmission-validation-msg" is displayed
    And the element "des-final-outcome-screen::pass-certificate-number-validation-msg" is displayed
    And I scroll to element "des-final-outcome-screen::debrief-witnessed-validation-msg"
    And the element "des-final-outcome-screen::debrief-witnessed-validation-msg" is displayed
    And I complete the successful final outcome screen from a data table
      | provisionalLicenceReceived    | Yes              |
      | transmission                  | Manual           |
      | passCertNumber                | A123456X         |
      | d255                          | NA               |
      | testLanguage                  | NA               |
      | debriefWitnessed              | Yes              |
    And I click on the button "des-final-pass-declaration-screen::continue-btn"
    And the element "des-final-pass-declaration-screen::pass-certificate-receipt-validation-msg" is displayed
    And the element "des-final-pass-declaration-screen::signature-pad-validation-msg" is displayed
    And I complete the health declaration page for a category "B"
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                      |
      | activityCode          | 1 - Pass                                    |
      | testCategory          | B                                           |
      | provLicenceRecieved   | Yes - Please retain the candidates licence  |
      | transmission          | Manual                                      |
      | d255                  | No                                          |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I click on the button "des-office-page::mark-as-complete"
    And the element "des-office-page::route-number-validation-msg" is displayed
    And the element "des-office-page::independent-driving-validation-msg" is displayed
    And I scroll to element "des-office-page::desc-of-candidate-validation-msg"
    And the element "des-office-page::desc-of-candidate-validation-msg" is displayed
    And I scroll to element "des-office-page::show-me-question-validation-msg"
    And the element "des-office-page::show-me-question-validation-msg" is displayed
    And I scroll to element "des-office-page::weather-conditions-validation-msg"
    And the element "des-office-page::weather-conditions-validation-msg" is displayed
    And I scroll to element "des-office-page::route-number-input"
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
    And I expect that element "#activity-code-20654335" matches the text "1"
    And I click on the button "des-general::back-btn"
    And I sign out
