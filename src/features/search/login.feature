@focus
Feature: Login to the application
    Scenario: Get to the home page
        # Given I Logout from the search application
        Given I am signed in as a random user
        And I wait for the loading spinner with the text "Refreshing databases"
        And I pause for 1000ms