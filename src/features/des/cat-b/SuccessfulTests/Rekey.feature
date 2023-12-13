Feature: Cat-B Successful feature

  Scenario:   Successful Test Rekey
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I go back 1 day and check the date is correct
    And I start the test for rekey "20654339"
    And I complete the waiting room declaration page
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "B"
      | eyesightTest            | pass             |
      | tellMeQuestion          | T1 - Brakes      |
      | tellMeQuestionFault     | correct          |
      | vehicleRegNum           | autopck           |
      | transmission            | manual           |
      | accompaniedBy           | instructor       |
      | vehicleDetails          | school car       |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I select all legal requirements for a category "B"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I expect that element "des-debrief-screen::test-outcome-passed" is displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I complete the successful final outcome screen from a data table
      | provisionalLicenceReceived    | No               |
      | transmission                  | Automatic        |
      | passCertNumber                | A123456X         |
      | d255                          | NA               |
      | testLanguage                  | cymraeg          |
      | debriefWitnessed              | Yes              |
    And I complete the health declaration page for a category "B"
    And I check the confirmation page details from a data table
      | testOutcome           | Passed                                                        |
      | activityCode          | 1 - Pass                                                      |
      | testCategory          | B                                                             |
      | provLicenceReceived   | No - Please ensure that the licence is kept by the candidate.  |
      | transmission          | Automatic - An automatic licence issued                       |
      | d255                  | No                                                            |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I complete the Office page from a data table
      | activityCode            | NA                                          |
      | routeNumber             | 20                                          |
      | independentDriving      | traffic signs                               |
      | trueLikeness            | no                                          |
      | distinguishingFeatures  | Tall, red shirt, brown hair. 5 foot tall    |
      | identification          | passport                                    |
      | showMeQuestion          | S4 - Rear demister                        |
      | weatherCondition        | 4 - Showers                      |
    And I click on the element "des-rekey-reason-page::continue-reason-rekey"
    And I complete the Rekey reason page from a data table
      | ipad                 | tech                                        |
      | transfer             | 123456                                      |
      | other                | Test other reason                           |
    And I click on the button "des-rekey-reason-page::upload-rekey-btn"
    And I click on the element "des-rekey-reason-page::upload-btn"
    And I expect that element "des-rekey-reason-page::upload-spinner" is not displayed
    And I wait on element "des-rekey-reason-page::outcome-page" to be displayed
    And I expect that element "des-rekey-reason-page::outcome-page" is displayed
    And I expect that element "des-rekey-reason-page::rekey-success-text" is displayed
    And I click on the element "des-rekey-reason-page::return-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect the activity code "20654339" matches the text "1"
    And I click on the button "des-general::back-btn"
    And I sign out
