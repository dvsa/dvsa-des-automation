Feature: Cat-B Successful feature

  Scenario:   Successful Test with no faults
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-20654335"
    And I wait on element "des-exam-waiting-room::insurance-declaration-label" to be displayed
    And I complete the waiting room declaration page
    And I wait on element "des-comms-screen::by-post-radio-btn" to be displayed
    And I complete the waiting room communication page
    And I wait on element "des-waiting-room-to-car::page-title" to be displayed
    And I complete the waiting room to car page from a data table for a category "B"
      | eyesightTest            | pass             |
      | tellMeQuestion          | T1 - Brakes      |
      | tellMeQuestionFault     | correct          |
      | vehicleRegNum           | vehreg           |
      | transmission            | manual           |
      | accompaniedBy           | instructor       |
      | vehicleDetails          | school car       |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I wait on element "des-test-report-screen::page-title" to be displayed
    And I select all legal requirements for a category "B"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I expect that element "des-debrief-screen::test-outcome-passed" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I wait on element "des-final-outcome-screen::page-title" to be displayed
    And I complete the successful final outcome screen from a data table
      | provisionalLicenceReceived    | Yes              |
      | transmission                  | Manual           |
      | passCertNumber                | A123456X         |
      | d255                          | NA               |
      | testLanguage                  | NA               |
      | debriefWitnessed              | Yes              |
    And I wait on element "des-final-pass-declaration-screen::page-title" to be displayed
    And I complete the health declaration page for a category "B"
    And I wait on element "des-final-confirmation-screen::page-title" to be displayed
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                      |
      | activityCode          | 1 - Pass                                    |
      | testCategory          | B                                           |
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
      | independentDriving      | sat nav                                     |
      | trueLikeness            | yes                                         |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | showMeQuestion          | S1 - Rear windscreen                        |
      | weatherCondition        | 1 - Bright / dry roads                      |
    And I click on the button "des-office-page::mark-as-complete"
    And I wait on element "des-office-page::mark-as-complete-modal-title" to be displayed
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I wait on element "#activity-code-20654335" to be displayed
    And I expect that element "#activity-code-20654335" matches the text "1"
    And I wait on element "des-my-journal::journal-back-button" to be displayed
    And I click on the button "des-my-journal::journal-back-button"
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
