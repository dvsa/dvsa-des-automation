@focus
Feature: Add data to new textbox using a pageobject
    Scenario:
        Given The app is loaded using "ionicapp-general::pagetitle"
        Then I navigate to the other page
        Then I pause for 2000ms 