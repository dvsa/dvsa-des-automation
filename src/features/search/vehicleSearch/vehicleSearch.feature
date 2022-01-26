Feature: Search for a vehicle
    Scenario: Search for a car
        When I search for "ABC123"
        Then I expect that element "smc-search::textinsidevehicleresult" contains the text "No Results - Sorry, we could not find any results"
        # And I pause for 3000ms
        