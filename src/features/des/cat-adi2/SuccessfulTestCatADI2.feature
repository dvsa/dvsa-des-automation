Feature: Cat-ADI2 Successful feature

  Scenario:   Successful ADI2 with no faults
    Given I am signed in as a random "desexaminerbe" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000012"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-22123400"
    And I complete the waiting room declaration page for a category "adi2"
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "adi2"
      | eyesightTest            | pass                     |
      | tellMeQuestion1         | T2 - Tyre pressures      |
      | tellMeQuestion2         | T7 - Direction indicators|
      | tellMeQuestion3         | T8 - Brake lights        |
      | tellMeQuestion1Fault    | correct                  |
      | tellMeQuestion2Fault    | correct                  |
      | tellMeQuestion3Fault    | correct                  |
      | vehicleRegNum           | vehreg                   |
      | transmission            | manual                   |
      | orditTrainer            | yes                      |
      | trainingRecords         | yes                      |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "adi2"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-passed" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I complete the successful final outcome screen from a data table
      | debriefWitnessed              | yes              |
    And I check the confirmation page details from a data table
      | testOutcome           | Passed       |
      | activityCode          | 1 - Pass     |
      | testCategory          | ADI2         |
      | provLicenceRecieved   | na           |
      | transmission          | na           |
      | d255                  | na           |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I complete the Office page from a data table
      | routeNumber             | 2                                           |
      | independentDriving      | sat nav                                     |
      | trueLikeness            | yes                                         |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | firstShowMeQuestion     | A15 - Rear windscreen                       |
      | secondShowMeQuestion    | A16 - Front windscreen                      |
      | weatherCondition        | 10 - Windy                                  |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I scroll to element "#activity-code-22123400"
    And I expect that element "#activity-code-22123400" matches the text "1"
    And I click on the button "des-my-journal::journal-back-button"
    And I sign out
