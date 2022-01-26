Feature: Additional Information Validation

    Scenario: Validate Additional Information

        Given I am signed in as a random user
        Then I wait on element "smc-general::db-spinner" to not be displayed
        When I click on the element "smc-sidemenu::sidemenubutton"
        Then I wait for the "smc-sidemenu::menutitle" menu to show
        Then I click on the button with the text "Current Encounter"
        Then I click on the button with the text "Encounter Details"
        When I fill in the mandatory encounter details from a datatable
            | location        | 4TH MILESTONE LAY-BY |
            | nationality     | Great Britain        |
            | vehicleid       | VRM12                |
            | vehicleType     | HGV Artic            |
            | encounterReason | SPOT CHECK           |
        And I click on the button with the text "Start Encounter"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Vehicle"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#encounterVehicleDetails_pagetitle" to be displayed        
        When I fill in the mandatory vehicle details from a datatable
            | make     | ERF   |
            | model    | 123   |
            | body     | ARTIC |
            | seating  | NA    |
            | odometer | 123   |
       Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Driver 1"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#driverDetails_pagetitle" to be displayed
        When I click on the element "#driverDetailsDateOfBirthPicker button"
        When I set "14/10/1996" to the ionic 3 date field "#driverDetailsDateOfBirthPicker"
        Then I click on the button with the text "Done"
        When I fill in the mandatory driver 1 details from a datatable
            | ethnicity            | W1 - BRITISH |
            | firstName            | John         |
            | lastName             | Doe          |
            | resident             | No           |
            | Address1             | ad1          |
            | postTown             | 133          |
            | issuingNation        | AL - Albania |
            | drivingLicenceNumber | 123          |
 Then I wait on element "#currentEncounter_pagetitle" to be displayed
        Then I click on the button with the text "Journey"
        Then I wait on element "smc-general::db-spinner" to not be displayed
        Then I wait on element "#journeyDetails_pagetitle" to be displayed        
        When I fill in the mandatory journey from a datatable
            | type          | EC        |
            | startLocation | London    |
            | endLocation   | Swansea   |
            | goodsCarried  | Materials |
        Then I click on the button with the text "Additional Information"
        When I fill in all additional information from a datatable
            | inspectionLevel                    | FULL                                |
            | speedLimitedCheckToggle            | Yes                                 |
            | defectProsecution                  | NO                                  |
            | specialReturn                      | ANPR                                |
            | specialReturnDetail                | NAS Camera Targeted Check           |
            | returnSpecialReturnFutureEncounter | No                                  |
            | additionalTextType                 | POLICE DETAILS                      |
            | additionalText                     | Abc1234 .dksd- &k,s. F(g)h£S#s:s;s+ |
            | digitalActualDriver                | 1                                   |
            | digitalOtherDriver                 | 1                                   |
            | analogueActualDriver               | 1                                   |
            | analogueOtherDriver                | 1                                   |
        Then I click on the button with the text "Additional Information"
        When I fill in all additional information from a datatable
            | inspectionLevel                    | FULL            |
            | speedLimitedCheckToggle            | Yes             |
            | defectProsecution                  | NO              |
            | specialReturn                      | CDG_CHECK       |
            | specialReturnDetail                | ADR VEHICLE     |
            | returnSpecialReturnFutureEncounter | No              |
            | additionalTextType                 | POCKET BOOK REF |
            | additionalText                     | Random          |
            | digitalActualDriver                | NA              |
            | digitalOtherDriver                 | NA              |
            | analogueActualDriver               | NA              |
            | analogueOtherDriver                | NA              |
        Then I click on the button with the text "Complete Encounter"
        Then I click on the button with the text "Submit Encounter"

