Feature: Cat-DM Unsuccessful feature

  Scenario:   Unsuccessful DM with Dangerous and Serious faults
    Given I am signed in as a random "desexaminerm" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000014"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-55512309"
    And I complete the waiting room declaration page
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "Manoeuvre"
      | vehicleRegNum            | vehreg                             |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "Manoeuvre"
    And I add "1" serious faults to the "des-test-report-screen::reverse-manoeuvre-competency-label-Control" field
    And I add "1" dangerous faults to the "des-test-report-screen::reverse-manoeuvre-competency-label-observation" field
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I check from a data table the number of faults are correct
      | faultSelector                                            | faultExpectedText          | faultCountSelector                         | numberOfFaults      |
      | des-debrief-screen::reverse-observation-dangerous-text   | Reverse - Observation      | des-debrief-screen::dangerous-fault-count  | 1                   |
      | des-debrief-screen::reverse-control-serious-text         | Reverse - Control          | des-debrief-screen::serious-fault-count    | 1                   |
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the element "des-debrief-screen::continue-non-pass-final-btn"
    And I expect that element "des-final-outcome-screen::page-title-non-pass" is displayed
    And I complete the unsuccessful final outcome screen from a data table
      | testLanguage                  | na              |
      | debriefWitnessed              | yes             |
    And I check the confirmation page details from a data table
      | testOutcome           | Unsuccessful                                |
      | activityCode          | 2 - Fail                                   |
      | testCategory          | DM                                          |
      | provLicenceRecieved   | na                                          |
      | transmission          | Manual                                      |
      | d255                  | na                                          |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I complete the Office unsuccessful page from a data table
      | activityCode            | NA                                          |
      | trueLikeness            | yes                                         |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | weatherCondition        | 1 - Bright / dry roads                      |
      | faultComment            | Commenting on faults, there were a some.    |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I scroll to element "#activity-code-55512309"
    And I expect that element "#activity-code-55512309" matches the text "2"
    And I click on the button "des-my-journal::journal-back-button"
    And I sign out
