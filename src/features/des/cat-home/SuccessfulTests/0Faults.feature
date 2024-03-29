Feature: Cat-G Home Successful feature

  Scenario:   Successful Cat-G Home with no faults
    Given I am signed in as a random "desexaminerbe" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000012"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "22123414"
    And I complete the waiting room declaration page
    And I complete the auth page
    And I complete the candidate ID page from a data table
      | trueLikeness            | yes              |
    And I complete the waiting room communication page
    And I complete the auth page
    And I complete the waiting room to car page from a data table for a category "home"
      | eyesightTest            | pass                                |
      | showMeQuestion          | H1 - Direction indicators           |
      | tellMeQuestion          | H14 - Windscreen washer reservoir   |
      | showMeQuestionFault     | correct                             |
      | tellMeQuestionFault     | correct                             |
      | vehicleRegNum           | autopck                              |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "home"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-passed" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I complete the successful final outcome screen from a data table
      | provisionalLicenceReceived    | Yes              |
      | passCertNumber                | A123456X         |
      | d255                          | NA               |
      | testLanguage                  | NA               |
      | debriefWitnessed              | Yes              |
    And I complete the health declaration page for a category "home"
    And I complete the auth page
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                      |
      | activityCode          | 1 - Pass                                    |
      | testCategory          | G                                           |
      | provLicenceReceived   | Yes - Please retain the candidates licence.  |
      | transmission          | Manual                                      |
      | d255                  | No                                          |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I complete the Office page from a data table
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | weatherCondition        | 10 - Windy                                  |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect the activity code "22123414" matches the text "1"
    And I click on the button "des-general::back-btn"
    And I sign out
