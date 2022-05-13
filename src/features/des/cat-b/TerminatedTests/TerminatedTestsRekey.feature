Feature: Cat-B Terminated with Rekey feature

  Scenario:   Terminate Test Rekey
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I click on the element "des-rekey-reason-page::previous-day-btn"
    And I wait on element "#rekey-button-20654339" to be displayed
    And I click on the button "#rekey-button-20654339"
    # And I wait on element "des-my-journal::start-test-modal-start-test-btn" to be displayed
    # And I click on the button "des-my-journal::start-test-modal-start-test-btn"
    And I wait on element "des-exam-waiting-room::insurance-declaration-label" to be displayed
    And I complete the waiting room declaration page
    And I wait on element "des-comms-screen::by-post-radio-btn" to be displayed
    And I complete the waiting room communication page
    And I wait on element "des-waiting-room-to-car::page-title" to be displayed
    And I complete the waiting room to car page
    And I wait on element "des-test-report-screen::page-title" to be displayed
    And I select all legal requirements
    And I add "1" serious fault to the "des-test-report-screen::competency-btn-accelarator" field
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-terminate-test-btn"
    And I wait on element "des-debrief-screen::test-outcome-terminated" to be displayed
    And I check from a data table the number of faults are correct
      | faultSelector                                                 | faultExpectedText                | faultCountSelector                                                 | numberOfFaults      |
      | des-debrief-screen::control-accelerator-serious-fault         | Control - Accelerator            | des-debrief-screen::control-accelerator-driver-serious-count       | S                   |
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I click on the element "des-post-debrief-screen::continue-btn"
    And I wait on element "des-final-outcome-screen::page-title-non-pass" to be displayed
    And I complete the terminated final outcome screen from a data table
      | activityCode                  | des-final-outcome-screen::activity-code-21   |
      | d255                          | na                                           |
      | testLanguage                  | na                                           |
      | debriefWitnessed              | na                                           |
    And I wait on element "des-final-confirmation-screen::page-title" to be displayed
    And I check the confirmation page details from a data table
      | testOutcome           | Terminated                                                    |
      | activityCode          | 21 - Vehicle / gear not suitable or no vehicle for test       |
      | testCategory          | B                                                             |
      | provLicenceRecieved   | na                                                            |
      | transmission          | na                                                            |
      | d255                  | No                                                            |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I wait on element "des-final-confirmation-screen::submit-test-modal-title" to be displayed
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I wait on element "des-back-to-office-holding-page::continue-to-write-up-btn" to be displayed
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I wait on element "des-office-page::page-title" to be displayed
    And I complete the Office unsuccessful page from a data table
      | activityCode            | NA                                          |
      | routeNumber             | NA                                          |
      | independentDriving      | NA                                          |
      | trueLikeness            | no                                          |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | photo card                                  |
      | showMeQuestion          | NA                                          |
      | weatherCondition        | 1 - Bright / dry roads                      |
      | seriousFaultComment     | NA                                          |
    And I click on the element "des-rekey-reason-page::continue-reason-rekey"
    And I complete the Rekey reason page from a data table
      | ipad                 | tech                                        |
      | transfer             | 123456                                      |
      | other                | Other Testing                               |
    And I click on the button "des-rekey-reason-page::upload-rekey-btn"
        And I wait on element "des-rekey-reason-page::upload-modal" to be displayed
    And I click on the element "des-rekey-reason-page::upload-btn"
    And I expect that element "des-rekey-reason-page::upload-spinner" is not displayed
    And I wait on element "des-rekey-reason-page::outcome-page" to be displayed
    And I click on the element "des-rekey-reason-page::return-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I wait on element "#activity-code-20654339" to be displayed
    And I expect that element "#activity-code-20654339" matches the text "21"
    And I wait on element "des-my-journal::journal-back-button" to be displayed
    And I click on the button "des-my-journal::journal-back-button"
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
