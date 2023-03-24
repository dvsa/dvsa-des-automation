Feature: Cat-ADI3 Successful feature

  Scenario: Successful Grade B ADI3 test
    Given I am signed in as a random "desexaminerw" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "10000013"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I start the test for "#start-test-button-23123428"
    And I complete the waiting room declaration page for a category "adi3"
    And I complete the waiting room communication page
    And I complete the waiting room to car page from a data table for a category "adi3"
      | vehicleRegNum           | vehreg                |
      | duelControls            | No                    |
      | transmission            | Automatic             |
      | pdiLogbook              | No                    |
      | traineeLicence          | Yes                   |
      | orditTrainer            | Yes                   |
    And I click on the element "des-waiting-room-to-car::continue-to-test-report-btn"
    And I click on the element "des-test-report-screen::adi-dashboard-lesson-and-theme-card-heading"
    And I wait on element "des-lesson-and-theme-screen::lesson-and-theme-title" to exist
    And I select the student option "Trained"
    And I select the lesson theme options
      | Junctions                   |
      | Motorways                   |
    And I scroll to element "des-lesson-and-theme-screen::continue-button"
    And I click on the element "des-lesson-and-theme-screen::continue-button"
    And I click on the element "des-test-report-screen::adi-dashboard-test-report-card-heading"
    And I score 0 for the 1st question for section "Lesson Planning"
    And I score 0 for the 2nd question for section "Lesson Planning"
    And I score 0 for the 3rd question for section "Lesson Planning"
    And I score 0 for the 4th question for section "Lesson Planning"
    And I score 3 for the 1st question for section "Risk management"
    And I score 3 for the 2nd question for section "Risk management"
    And I score 3 for the 3rd question for section "Risk management"
    And I score 3 for the 4th question for section "Risk management"
    And I score 3 for the 5th question for section "Risk management"
    And I score 0 for the 1st question for section "Teaching & learning strategies"
    And I score 0 for the 2nd question for section "Teaching & learning strategies"
    And I score 1 for the 3rd question for section "Teaching & learning strategies"
    And I score 3 for the 4th question for section "Teaching & learning strategies"
    And I score 3 for the 5th question for section "Teaching & learning strategies"
    And I score 3 for the 6th question for section "Teaching & learning strategies"
    And I score 3 for the 7th question for section "Teaching & learning strategies"
    And I score 3 for the 8th question for section "Teaching & learning strategies"
    And I scroll to element "des-adi-test-report-screen::total-score-value"
    And the element "des-adi-test-report-screen::total-score-value" matches the text "31"
    And I click on the element "des-adi-test-report-screen::continue-button"
    And I click on the element "des-test-report-screen::adi-review-card-feedback-textarea"
    And I input the letter "e" into adi3 review textbox
    And I click on the element "des-test-report-screen::end-test-btn"
    And the element "des-test-report-screen::test-outcome-text-modal" matches the text "Passed - Grade B"
    And the element "des-test-report-screen::modal-lesson-planning-score" matches the text "0"
    And the element "des-test-report-screen::modal-risk-management-score" matches the text "15"
    And the element "des-test-report-screen::modal-teaching-and-learning-score" matches the text "16"
    And the element "des-test-report-screen::modal-overall-score" matches the text "31"
    And I click on the button "des-test-report-screen::modal-adi-continue-to-debrief-button"
    And I wait on element "des-debrief-screen::adi-status-passed-grade" to be displayed
    And the element "des-debrief-screen::adi-status-passed-grade" matches the text "Passed - Grade B"
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I wait on element "des-final-outcome-screen::test-outcome-pass" to be displayed
    And I complete the successful final outcome screen from a data table
      | testOutcome                   | Passed - Grade B |
      | debriefWitnessed              | Yes              |
      | furtherAdvice                 | Yes              |
    And I check the confirmation page details from a data table
      | testOutcome                 | Passed - Grade B                          |
      | activityCode                | 1 - Pass                                  |
      | testCategory                | ADI3                                      |
      | student                     | Trained                                   |
      | lessonTheme                 | Junctions, Motorways                      |
      | lessonPlanning              | 0                                         |
      | riskManagement              | 15                                        |
      | teachingLearningStrategies  | 16                                        |
      | totalScore                  | 31                                        |
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I click on the button "des-final-confirmation-screen::submit-modal-submit-btn"
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I click on the button "des-back-to-office-holding-page::single-app-mode-error-modal"
    And I complete the Office page from a data table
      | additionalInformation             | Test went okay, will continue with out problems       |
    And I click on the button "des-office-page::mark-as-complete"
    And I click on the button "des-office-page::mark-as-complete-modal-submit-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect that element "#activity-code-23123428" matches the text "1"
    And I click on the button "des-general::back-btn"
    And I sign out
