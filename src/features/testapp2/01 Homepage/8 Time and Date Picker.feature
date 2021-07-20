Feature: Homepage
    Scenario: Time and Date Pickers
        Given The app is loaded using "ionicapp-general::pagetitle"
        # When I wait on element "ionicapp-general::home" for 2000ms to exist
        When I click on the button "ionicapp-general::home"
        When I wait on element "ionicapp-homepage::dateofbirth" for 2000ms to exist
        When I set "27/03/1974" to the ionic date field "ionicapp-homepage::dateofbirth"
        When I set "10/01/2021" to the ionic date field "ionicapp-homepage::startdate"
        When I set "10/02/2021" to the ionic date field "ionicapp-homepage::enddate"
        When I set "10:30PM" to the ionic time field "ionicapp-homepage::starttime"
        Then I expect that element "ionicapp-homepage::starttime" matches the time "10:30PM"
# Then I pause for 1000ms