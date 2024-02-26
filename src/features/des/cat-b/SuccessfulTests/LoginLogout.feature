@test @testingFull
Feature: Cat-B Successful feature

  Scenario:   Successful Test with no faults
    Given I am signed in as a random "mobexaminer1" user
    When I wait on element "des-dashboard::page-title" to be displayed
    And I expect that container "des-dashboard::staff-number" contains the text "1234567"
#    And I pause for 1000ms
    And I sign out
