Feature: Cat-B Unsuccessful with serious faults feature Rekey

  Scenario:   Unsuccessful test Rekey
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I click on the element "des-rekey-reason-page::previous-day-btn"
    And I wait on element "#rekey-button-20654339" to be displayed
    And I click on the button "#rekey-button-20654339"
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
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I wait on element "des-test-report-screen::page-title" to be displayed
    And I select all legal requirements for a category "B"
    And I add "1" serious fault to the "des-test-report-screen::competency-btn-accelarator" field
    And I click on the button "des-test-report-screen::end-test-btn-xpath"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-failed" to be displayed
    Then I expect that element ".counter-label" matches the text "Control - Accelerator"
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the button "des-post-debrief-screen::continue-btn"
    And I complete the unsuccessful final outcome screen from a data table
      | d255                          | yes             |
      | testLanguage                  | cymraeg         |
      | debriefWitnessed              | yes             |
    And I wait on element "des-final-confirmation-screen::page-title" to be displayed
    And I check the confirmation page details from a data table
      | testOutcome           | Unsuccessful                                |
      | activityCode          | 2 - Fail                                    |
      | testCategory          | B                                           |
      | provLicenceRecieved   | na                                          |
      | transmission          | na                                          |
      | d255                  | Yes - Please complete a D255                |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I wait on element "des-final-confirmation-screen::submit-test-modal-title" to be displayed
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I wait on element "des-back-to-office-holding-page::continue-to-write-up-btn" to be displayed
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I wait on element "des-office-page::page-title" to be displayed
    And I complete the Office unsuccessful page from a data table
      | routeNumber             | 8                                           |
      | independentDriving      | traffic signs                               |
      | trueLikeness            | no                                          |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | passport                                    |
      | showMeQuestion          | S5 - Horn                                   |
      | weatherCondition        | 9 - Icy                                     |
      | faultComment            | Commenting on faults, there were a some.    |
    And I click on the element "des-rekey-reason-page::continue-reason-rekey"
    And I complete the Rekey reason page from a data table
      | ipad                 | lost                                      |
      | transfer             | 123456                                    |
      | other                | test123 reason                            |
    And I click on the button "des-rekey-reason-page::upload-rekey-btn"
    And I wait on element "des-rekey-reason-page::upload-modal" to be displayed
    And I click on the element "des-rekey-reason-page::upload-btn"
    And I expect that element "des-rekey-reason-page::upload-spinner" is not displayed
    And I wait on element "des-rekey-reason-page::outcome-page" to be displayed
    And I expect that element "des-rekey-reason-page::outcome-page" is displayed
    And I wait on element "des-rekey-reason-page::rekey-success-text" to be displayed
    And I expect that element "des-rekey-reason-page::rekey-success-text" is displayed
    And I wait on element "des-rekey-reason-page::return-journal-btn" to be displayed
    And I click on the element "des-rekey-reason-page::return-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I wait on element "#activity-code-20654339" to be displayed
    And I expect that element "#activity-code-20654339" matches the text "2"
    And I wait on element "des-my-journal::journal-back-button" to be displayed
    And I click on the button "des-my-journal::journal-back-button"
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
