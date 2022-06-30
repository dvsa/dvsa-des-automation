Feature: Cat-ADI2 Unsuccessful feature

  Scenario:   Unsuccessful ADI2 with 7 driving faults
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
      | tellMeQuestion1Fault    | 1 driving fault          |
      | tellMeQuestion2Fault    | 1 driving fault          |
      | tellMeQuestion3Fault    | 1 driving fault          |
      | vehicleRegNum           | vehreg                   |
      | transmission            | manual                   |
      | orditTrainer            | yes                      |
      | trainingRecords         | yes                      |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "adi2"
    And I expect that container "des-test-report-screen::driving-fault-counter" contains the text "3"
    And I add "4" driving faults to the "des-test-report-screen::competency-btn-accelarator" field
    And I expect that container "des-test-report-screen::driving-fault-counter" contains the text "7"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-failed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-failed" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the element "#continue-to-non-pass-finalisation"
    And I complete the unsuccessful final outcome screen from a data table
      | debriefWitnessed              | yes             |
    And I check the confirmation page details from a data table
      | testOutcome           | Unsuccessful |
      | activityCode          | 2 - Fail     |
      | testCategory          | ADI2         |
      | provLicenceRecieved   | na           |
      | transmission          | na           |
      | d255                  | na           |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I complete the Office unsuccessful page from a data table
      | routeNumber             | 22                                          |
      | independentDriving      | sat nav                                     |
      | trueLikeness            | yes                                         |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | firstShowMeQuestion     | A15 - Rear windscreen                       |
      | secondShowMeQuestion    | A16 - Front windscreen                      |
      | weatherCondition        | 10 - Windy                                  |
      | faultComment            | Did many things wrong.                      |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I scroll to element "#activity-code-22123400"
    And I expect that element "#activity-code-22123400" matches the text "2"
    And I click on the button "des-my-journal::journal-back-button"
    And I sign out
