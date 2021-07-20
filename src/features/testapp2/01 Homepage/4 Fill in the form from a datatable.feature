Feature: Homepage - Fill in the homepage with data from a table
    Scenario: Fill in the homepage with data from a table
        # Given The app has rendered
        And I click on the button "ionicapp-general::home"
        When I wait on element "ionicapp-homepage::firstname" for 2000ms to exist

        When I fill in the form from a datatable
            | firstname | lee                             |
            | lastname  | carter                          |
            | email     | hello1234567@aintthatbetter.com |
            | age       | 32                              |
            | aboutme   | monkeys                         |