Feature: Journal Feature

  @test
  Scenario:   Examiner with no Journal information to display
    Given I am signed in as a random "super2" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "99990020"
    And I click on the button "des-dashboard::my-journal-btn"
    And I expect that element "des-my-journal::journal-loading-spinner" is not displayed
#    And I click on the button "des-my-journal::previous-day-btn"
#    And I go back "3" day and check the date is correct
    And I go forward "3" day and check the date is correct

    And I pause for 10000ms
