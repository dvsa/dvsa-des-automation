Feature: Login to the application

    Background:  Optional background step

    Scenario: Get to the home page
        Given I am signed in as a random user
        And I wait for the loading spinner with the text "Refreshing databases"

