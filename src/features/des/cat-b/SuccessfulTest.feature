Feature: Cat-B Successful feature

  @test
  Scenario Outline:   Scenario
#    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that element "des-dashboard::staff-number" matches the text "1234567"
    And I click on the button "des-dashboard::my-journal-btn"
    And I wait on element "#start-test-button-20654335" to be displayed
    And I click on the button "#start-test-button-20654335"
    And I wait on element "des-my-journal::start-test-modal-start-test-btn" to be displayed
    And I click on the button "des-my-journal::start-test-modal-start-test-btn"
    And I wait on element "des-exam-waiting-room::insurance-declaration-label" to be displayed
    And I click on the element "des-exam-waiting-room::insurance-declaration-label"
    And I click on the element "des-exam-waiting-room::residency-declaration-label"
    And I click on the element "des-exam-waiting-room::signature-area-xpath"
    And I click on the button "des-general::continue-btn"
    And I wait on element "des-comms-screen::by-post-radio-btn" to be displayed
    And I click on the element "des-comms-screen::by-post-radio-btn"
    And I click on the button "//app-communication//candidate-section/ion-row[2]/ion-col[2]/ion-button[1]/h3"
    And I wait on element "des-waiting-room-to-car::page-title" to be displayed
    And I click on the element "des-waiting-room-to-car::eyesight-pass-label"
    And I click on the button "des-waiting-room-to-car::tell-me-selector"
    And I click on the button with the text "<optiontext>"
    And I click on the button with the text "Submit"
    And I click on the element "des-waiting-room-to-car::tell-me-answer-correct-label"
    When I add "Vehreg" to the inputfield "des-waiting-room-to-car::vehicle-registration-input"
    And I click on the element "des-waiting-room-to-car::manual-transmission-label"
    And I click on the button "des-waiting-room-to-car::continue-to-test-report-btn"
    And I wait on element "des-test-report-screen::page-title" to be displayed
#    And I click on the element "span='AS'"
#    And I long click on the element "des-test-report-screen::test-requirement-first-ns-label"
#    And I pause for 5000ms
#    And I click on the element with the text "NS"

    And I pause for 2000ms

    And I wait on element "#legal-requirements-tick-NS" to be displayed
    And I long click on the element "#legal-requirements-tick-NS"

    And I pause for 5000ms


    And I click on the element "des-test-report-screen::test-requirement-first-ns-tick"
    And I click on the element "des-test-report-screen::test-requirement-second-ns-tick"
    And I click on the element "des-test-report-screen::test-requirement-as-tick"
    And I click on the element "des-test-report-screen::test-requirement-hs-ds-tick"
    And I click on the button "des-test-report-screen::eco-tick-button"
    And I click on the button "des-test-report-screen::show-tell-tick-button"



    And I click on the button "des-test-report-screen::manouvers-btn"
    And I wait on element "des-test-report-screen::manouvers-reverse-right-label" to be displayed
    And I click on the element "des-test-report-screen::manouvers-reverse-right-label"
    And I click on the button "des-test-report-screen::end-test-btn"
    And I click on the button "des-test-report-screen::end-test-continue-to-debrief-btn"
    And I wait on element "des-debrief-screen::test-outcome-passed" to be displayed
    And I click on the button "des-debrief-screen::end-debrief-btn"
    And I wait on element "des-final-outcome-screen::test-outcome-text" to be displayed
    And I click on the element "des-final-outcome-screen::provisional-license-recieved-yes-label"
    And I click on the element "des-final-outcome-screen::transmission-manual-label"
    When I add "A123456X" to the inputfield "des-final-outcome-screen::pass-certificate-number-field"
    And I click on the element "des-final-outcome-screen::debrief-witness-yes-label"
    And I click on the button "des-final-outcome-screen::continue-btn"
    And I wait on element "des-final-pass-declaration-screen::page-title" to be displayed
    And I click on the element "des-final-pass-declaration-screen::health-declaration-label"
    And I click on the element "des-final-pass-declaration-screen::certificate-recieved-label"
    And I click on the element "des-final-pass-declaration-screen::signature-area-xpath"
    And I click on the button "des-final-pass-declaration-screen::continue-btn"
    And I wait on element "des-final-confirmation-screen::page-title" to be displayed
    And I click on the button "des-final-confirmation-screen::submit-test-results-btn"
    And I wait on element "des-final-confirmation-screen::submit-test-modal-title" to be displayed
    And I click on the button "des-general::continue-btn"
    And I wait on element "des-back-to-office-holding-page::continue-to-write-up-btn" to be displayed
    And I click on the button "des-back-to-office-holding-page::continue-to-write-up-btn"
    And I wait on element "des-office-page::test-outcome-text" to be displayed
    And I add "5" to the inputfield "des-office-page::route-number"
    And I click on the element "des-office-page::independant-driving-sat-nav-label"
    And I click on the element "des-office-page::candidate-likeness-yes-label"
    And I add "Tall, red shirt, brown hair. 5 foot tall" to the inputfield "des-office-page::desc-of-candidate"
    And I click on the button "des-office-page::show-me-question-sel"
    And I click on the button with the text " S1 - Rear windscreen "
    And I click on the button with the text "Submit"
    And I click on the button "des-office-page::weather-conditions-sel"
    And I click on the button with the text "  9 - Icy  "
    And I click on the button with the text "Submit"
    And I click on the button "des-office-page::office-mark-complete-btn"
    And I wait on element "des-office-page::office-complete-modal-title" to be displayed
    And I click on the button "des-general::continue-btn"
    And I wait on element "#activity-code-20654335" to be displayed
    And I pause for 15000ms


    Examples:
      | optiontext    | expectedvalue |
      |  T1 - Brakes  |  T1 - Brakes  |

