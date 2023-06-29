Feature: Cat-B Unsuccessful with serious faults feature Rekey

  Scenario:   Unsuccessful test Rekey
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I go back 1 day and check the date is correct
    And I start the test for "#rekey-button-20654339"
    And I complete the waiting room declaration page
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "B"
      | eyesightTest            | pass             |
      | tellMeQuestion          | T1 - Brakes      |
      | tellMeQuestionFault     | correct          |
      | vehicleRegNum           | autopck           |
      | transmission            | manual           |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "B"
    And I add "1" serious fault to the "des-test-report-screen::competency-btn-accelarator" field
    And I click on the button "des-test-report-screen::end-test-btn-xpath"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-failed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-failed" is displayed
    Then I expect that element ".counter-label" matches the text "Control - Accelerator"
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the button "des-post-debrief-screen::continue-btn"
    And I complete the unsuccessful final outcome screen from a data table
      | d255                          | yes             |
      | testLanguage                  | cymraeg         |
      | debriefWitnessed              | yes             |
    And I check the confirmation page details from a data table
      | testOutcome           | Unsuccessful                                |
      | activityCode          | 2 - Fail                                    |
      | testCategory          | B                                           |
      | provLicenceReceived   | na                                          |
      | transmission          | na                                          |
      | d255                  | Yes - Please complete a D255                |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
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
    And I click on the element "des-rekey-reason-page::upload-btn"
    And I expect that element "des-rekey-reason-page::upload-spinner" is not displayed
    And I wait on element "des-rekey-reason-page::outcome-page" to be displayed
    And I expect that element "des-rekey-reason-page::outcome-page" is displayed
    And I expect that element "des-rekey-reason-page::rekey-success-text" is displayed
    And I click on the element "des-rekey-reason-page::return-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect that element "#activity-code-20654339" matches the text "2"
    And I click on the button "des-general::back-btn"
    And I sign out
