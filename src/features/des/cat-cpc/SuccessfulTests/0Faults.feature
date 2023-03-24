Feature: Cat-CPC Successful feature

  Scenario:   Successful test with no faults
    Given I am signed in as a random "desexaminerbe" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000012"
    And I click on the button "des-dashboard::my-journal-btn"
    And I start the test for "#start-test-button-22123466"
    And I wait on element "des-exam-waiting-room::insurance-declaration-label" to be displayed
    And I complete the waiting room declaration page
    And I complete the candidate ID page from a data table
      | trueLikeness            | yes              |
    And I wait on element "des-comms-screen::by-post-radio-btn" to be displayed
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "CPC"
      | vehicleRegNum            | vehreg                             |
      | details                  | articulated                        |
      | accompanied              | interpreter                        |
      | combination              | LGV3                               |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "CPC-Pass"
    And I click on the button "des-test-report-screen::view-summary-button"
    And I click on the button "des-test-report-screen::continue-to-debrief"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I wait on element "des-final-outcome-screen::page-title" to be displayed
    And I complete the successful final outcome screen from a data table
      | passCertNumber                | A123456X         |
      | testLanguage                  | NA               |
      | debriefWitnessed              | Yes              |
    And I wait on element "des-final-pass-declaration-screen::page-title" to be displayed
    And  I complete the health declaration page for a category "CPC"
    And I wait on element "des-final-confirmation-screen::page-title" to be displayed
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                      |
      | activityCode          | 1 - Pass                                    |
      | testCategory          | CCPC                                        |
      | provLicenceRecieved   | na                                          |
      | transmission          | na                                          |
      | d255                  | na                                          |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I wait on element "des-final-confirmation-screen::submit-test-modal-title" to be displayed
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I wait on element "des-back-to-office-holding-page::continue-to-write-up-btn" to be displayed
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I wait on element "des-office-page::page-title" to be displayed
    And I complete the Office page from a data table
      | activityCode            | NA                                          |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
    And I click on the button "des-office-page::mark-as-complete"
    And I wait on element "des-office-page::mark-as-complete-modal-title" to be displayed
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I wait on element "#activity-code-22123466" to be displayed
    And I expect that element "#activity-code-22123466" matches the text "1"
    And I wait on element "des-general::back-btn" to be displayed
    And I click on the button "des-general::back-btn"
    And I sign out
