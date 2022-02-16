Feature: Cat-B Successful feature

  @test
  Scenario:   Scenario
#    Given I am signed in as a random "Super" user
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
#    And I click on the button "des-general::continue-btn"
    And I select the 2nd option for element "#continue-button"
    And I wait on element "des-waiting-room-to-car::page-title" to be displayed
    And I click on the element "des-waiting-room-to-car::#eyesight-pass"
    And I pause for 15000ms
