Feature: Journal Feature

  @test
  Scenario:   Examiner with no Journal information to display
    Given I am signed in as a random "super2" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "99990020"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
    And I expect that element "des-my-journal::no-journal-entry-message" matches the text "There is no journal data to display for this day"
    And I go back 1 day and check the date is correct
    And I expect that element "des-my-journal::no-journal-entry-message" matches the text "There is no journal data to display for this day"
    And I go forward 2 day and check the date is correct
    And I expect that element "des-my-journal::no-journal-entry-message" matches the text "There is no journal data to display for this day"
