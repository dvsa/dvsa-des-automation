Feature: Test using HTTP get to load data from an endpoint
    Scenario: Load from a HTTP endpoint
        # When I perform some tests based on a http call to "https://swapi.dev/api/people/1"
        When I read person number "2" from the star wars api
        When I read planet number "8" from the star wars api
        When I read film number "1" from the star wars api
