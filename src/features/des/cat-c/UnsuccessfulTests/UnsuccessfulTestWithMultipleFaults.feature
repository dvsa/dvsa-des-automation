Feature: Cat-C Unsuccessful Tests

  Scenario: Unsuccessful test with multiple different faults
    Given I am signed in as a random "mobexaminer3" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "28371932"
    And I click on the button "des-dashboard::my-journal-btn"
    And I start the test for "#start-test-button-32345600"
    And I add "A123456X" to the inputfield "des-exam-waiting-room::manoeuvres-pass-cert-num"
    And I complete the waiting room declaration page
    When I wait on element "des-comms-screen::by-post-radio-btn" to be displayed
    And I complete the waiting room communication page
    When I wait on element "des-waiting-room-to-car::page-title" to be displayed
    And I complete the waiting room to car page from a data table for a category "C"
      | vehicleRegNum            | vehreg                             |
      | showMeQuestion1          | Q1 - All doors secure              |
      | showMeQuestion2          | Q2 - Air leaks                     |
      | showMeQuestion3          | Q13 - Check audible warnings       |
      | tellMeQuestion1          | Q3 - Safety factors while loading  |
      | tellMeQuestion2          | Q16 - Engine coolant               |
      | showMeQuestion1Fault     | 1 driving fault                    |
      | showMeQuestion2Fault     | 1 driving fault                    |
      | showMeQuestion3Fault     | 1 driving fault                    |
      | tellMeQuestion1Fault     | 1 driving fault                    |
      | tellMeQuestion2Fault     | 1 driving fault                    |
      | accompaniedBy            | other                              |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    When I wait on element "des-test-report-screen::page-title" to be displayed
    And I select all legal requirements for a category "C"
    And I add "1" dangerous faults to the "des-test-report-screen::competency-btn-accelarator" field
    And I expect that container "des-test-report-screen::driving-fault-counter" contains the text "4"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-failed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-failed" is displayed
    And I check from a data table the number of faults are correct
      | faultSelector                                                 | faultExpectedText                | faultCountSelector                                            | numberOfFaults      |
      | des-debrief-screen::control-accelerator-driver-fault          | Control - Accelerator            | des-debrief-screen::dangerous-fault-count                     | 1                   |
      | des-debrief-screen::vehicle-checks-serious-fault              | Vehicle checks                   | des-debrief-screen::serious-fault-count                       | 1                   |
      | des-debrief-screen::vehicle-checks-driving-fault              | Control - Accelerator            | des-debrief-screen::vehicle-checks-driving-fault-count        | 4                  |
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the element "des-debrief-screen::continue-non-pass-final-btn"
    When I wait on element "des-final-outcome-screen::page-title-non-pass" to be displayed
    And I complete the unsuccessful final outcome screen from a data table
      | d255                          | na              |
      | testLanguage                  | na              |
      | debriefWitnessed              | yes             |
    When I wait on element "des-final-confirmation-screen::page-title" to be displayed
    And I check the confirmation page details from a data table
      | testOutcome           | Unsuccessful                                |
      | activityCode          | 2 - Fail                                    |
      | testCategory          | C                                           |
      | provLicenceRecieved   | na                                          |
      | transmission          | na                                          |
      | d255                  | No                                          |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    When I wait on element "des-back-to-office-holding-page::continue-to-write-up-btn" to be displayed
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    When I wait on element "des-office-page::page-title" to be displayed
    And I complete the Office unsuccessful page from a data table
      | activityCode            | NA                                          |
      | routeNumber             | 2                                           |
      | independentDriving      | Diagram                                     |
      | trueLikeness            | yes                                         |
      | identification          | passport                                    |
      | weatherCondition        | 8 - Snowing                                 |
      | faultComment            | Commenting on faults, there were a some.    |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect that element "#activity-code-32345600" matches the text "2"
    And I click on the button "des-my-journal::journal-back-button"
    And I sign out
