Feature: CAT B Terminated Test - CODE 3
   

    @test
    Scenario: CAT B Terminated Test - CODE 3
        # Given I am signed in as a random "mobexaminer1" user
        When I wait on element "des-dashboard::page-title" to be displayed
        Then I wait on element "des-dashboard::my-journal-btn" to be displayed
        When I click on the element "des-dashboard::my-journal-btn"
        Then I wait on element "#start-test-button-20654324" to be displayed
        When I click on the element "#start-test-button-20654324"
        Then I wait on element "des-dashboard::start-test-rekey" to be displayed
        When I click on the element "des-dashboard::start-test-rekey"
        And I wait on element "des-declaration-page::declaration-section"
        Then I expect that element "#insurance-declaration-checkbox" is displayed
        Then I expect that element "#residency-declaration-checkbox" is displayed
        Then I expect that element "#signature-area-signature-pad" is displayed
        When I click on the element "#insurance-declaration-checkbox"
        Then I expect that checkbox "#insurance-declaration-checkbox" is checked 
        When I click on the element "#residency-declaration-checkbox"
        Then I expect that checkbox "#residency-declaration-checkbox" is checked 
        And I add "signature" to the inputfield "#signature-area-signature-pad"
        Then I click on the element "//signature-pad/canvas"
        And I pause for 10000ms
        Then I click on the element "#continue-button"
        Then I wait on element "#newEmailInput" to be displayed
        And I expect that element "#postalAddress" is displayed
        Then I click on the element "#postalAddress"
        And I wait on element ".display-address" to be displayed
        And the element "#addressLine1" matches the text "xxxx Station Street"
        And the element "#addressLine2" matches the text "Someplace"
        And the element "#addressLine3" matches the text "Sometown"
        And the element "#postcode" matches the text "ABxx xCD"
        Then I click on the element "#newEmail"
        Then I click on the element "#newEmailInput"
        # And I pause for 15000ms
        # And I set "newemail@mail.com" to the inputfield "#newEmailInput"
        # Then I click on the element "#continue-button"
        Then I wait on element "#waiting-room-to-car-eyesight-validation-text" to be displayed
        And the element "#eyesight-test-title" matches the text "Eyesight test"
        And the element "#tell-me-question-title" matches the text "Tell me question"
        And the element "#vehicle-registration-number-title" matches the text "Vehicle registration number"
        And the element "#transmission-title" matches the text "xxxx Station Street"
        And the element "#transmission-card" contains the text "Manual"
        And the element "#transmission-card" contains the text "Automatic"
        And I click on the element "#tell-me-selector"
        And I click on the element "#eyesight-pass"
        And I click on the element "#eyesight-pass"
        And I select the option with the text " T6 - Antilock braking system " for element "div"


# And I select any tell me question
# And I select Correct for the tell me question
# And I input a Vehicle Registration Number
# And I select either Manual or Automatic for Transmission
# And I press the "continue to test report"
# Then I am on the Test Report Page
# And I click the "end test" button
# And the end test modal appear
# And Validation appears for not ending test (NS, NS, AS, HS/DS, Manouvres, Show me/ Tell me, Eco)
# And I press the "return to test" button
# And I click the "NS" tick button
# And I click the "NS" tick button
# And I click the "AS" tick button
# And I click the "HS / DS" tick button
# And I click the "Manoeuvres" button
# And I select any manoeuvres button
# And I close down the manoeuvres menu
# And I click the "ECO" tick button
# And I click the "Show / Tell" tick button
# And I add a serious or dangerous fault
# And I click the "End Test" button
# And I click the "Terminate" button
# Then I am on the Debrief Page
# And the test outcome is "Terminated"
# And the fault is displayed
# And I press the "End Debrief" button
# And I press the 'Continue' button
# Then I am on the Finalise Outcome page
# And I check the page validation(Activity code dropdown)
# And I select the 'Activity code' dropdown
# And I select '4 - Fail in the interests of the public' 
# And I check the page validation (D255, Test language, debrief witnessed)
# And I select "yes" for Debrief Witness
# And I click the continue button
# Then I am on the Confirmation Details Page
# And I can see the candidate name
# And I can see the date and time of the test (????)
# And I can see the test outcome
# And I can see the test category
# And I can see the D255
# And I press the "Submit test results" button
# And submit modal pops up
# And I click the "submit" button
# Then I am on the blue Waiting Room Page
# And I click "Continue to write up" button
# Then I am on the Office Page
# And I check the page validation (route number, independent driving, physical description of the candidate, show me question, Weather conditions, serious/dangerous fault comment)
# And I input a route number
# And I select any option for Independent driving
# And I input a physical description of the candidate
# And I select any show me question
# And I select any weather condition
# And I input a fault comment
# And I click "Mark as complete" button
# And a modal pops up
# And I click the "continue" button
# Then I am on the Journal Page
# And I see that the candidate test activity code is "4"