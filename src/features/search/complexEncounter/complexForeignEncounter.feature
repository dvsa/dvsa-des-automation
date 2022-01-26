


Feature: Complex Foreign encounter

Scenario: Is able to submit a complex foreign encounter with offence and notices
    Given I am signed in as a random user
    Then I wait on element "smc-general::db-spinner" to not be displayed
    When I click on the element "smc-sidemenu::sidemenubutton"
    Then I wait for the "smc-sidemenu::menutitle" menu to show
    Then I click on the button with the text "Current Encounter"
    Then I click on the button with the text "Encounter Details"
    When I fill in the mandatory encounter details from a datatable
        | location        | 4TH MILESTONE LAY-BY |
        | nationality     | Algeria        |
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
    Then I click on the button with the text "Operator"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#operatorDetails_pagetitle" to be displayed
    When I fill in the mandatory operator details from a datatable
        | nationality          | GB            |
        | name                 | John          |
        | address1             | 123 Address   |
        | posttown             | Devon         |
        | country              | AL Albania    |
    Then I wait on element "#currentEncounter_pagetitle" to be displayed
    Then I click on the button with the text "Driver 1"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#driverDetails_pagetitle" to be displayed
    When I click on the element "#driverDetailsDateOfBirthPicker button"
    When I set "14/10/1996" to the ionic 3 date field "#driverDetailsDateOfBirthPicker"
    Then I click on the button with the text "Done"
    When I fill in the mandatory driver 1 details from a datatable
        | ethnicity            | W9 - ANY OTHER WHITE BACKGROUND |
        | firstName            | John         |
        | lastName             | Doe          |
        | resident             | No           |
        | Address1             | ad1          |
        | postTown             | 133          |
        | issuingNation        | DZ - Algeria |
        | drivingLicenceNumber | 123          |
    Then I wait on element "#currentEncounter_pagetitle" to be displayed
    Then I click on the button with the text "Trailer 1"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#encounterTrailerDetails_pagetitle" to be displayed
    When I fill in the mandatory trailer 1 details from a datatable
        | nationality   | Great Britain   |
        | trailerIdType | TRA             |
        | trailerId     | A111111         |
        | TrailerType   | Drawbar Trailer |
        | TrailerMake   | AHP             |
    Then I wait on element "#currentEncounter_pagetitle" to be displayed
    Then I click on the button with the text "Trailer 2"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#encounterTrailerDetails_pagetitle" to be displayed
    When I fill in the mandatory trailer 2 details from a datatable
        | nationality   | Great Britain   |
        | trailerIdType | TRA             |
        | trailerId     | A111112         |
        | TrailerType   | Drawbar Trailer |
        | TrailerMake   | AHP             |
    Then I wait on element "#currentEncounter_pagetitle" to be displayed
    Then I click on the button with the text "Journey"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#journeyDetails_pagetitle" to be displayed
    When I fill in the mandatory journey from a datatable
        | type                   | EC           |
        | startLocation          | London       |
        | endLocation            | Swansea      |
        | goodsCarried           | Materials    |
    Then I wait on element "#currentEncounter_pagetitle" to be displayed
    Then I click on the button with the text "Roadworthiness Checklist"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#roadWorthinessChecklistTitle" to be displayed
    Then I click on the element "smc-roadworthiness-checklist::save-data-button"
    Then I click on the button with the text "Additional Information"
    When I fill in the mandatory additional information from a datatable
        | inspectionLevel         | FULL |
        | speedLimitedCheckToggle | Yes  |
        | defectProsecution       | NO   |
    Then I wait on element "#currentEncounter_pagetitle" to be displayed
    Then I click on the button with the text "Dangerous Goods"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#dangerousGoodsTitle" to be displayed
    And I fill in the mandatory dangerous goods from a datatable
        | modeTransport     | Tank      |
        | unNumber          | 123       |
        | quantity          | 123       |
        | units             | Kilograms |
        | consignor         | Test      |
        | consignorAddress1 | address   |
        | consignorPostTown | 123       |
        | consignee         | rest      |
        | consigneeAddress1 | address   |
        | consigneePostTown | 124       |
    Then I wait on element "#currentEncounter_pagetitle" to be displayed
    Then I click on the button with the text "Defects"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#defectsTitle" to be displayed
    And I click on the element with the text "VRM12"
    And I add an "Immediate" defect to the vehicle from a datatable
        | category             | Brakes                                          |
        | section              | IM37 Service Brake Pedal                        |
        | subSection           | Controls.                                       |
        | description          | Foot brake pedal capable of applying each side of the vehicles brakes        |
        | text                 | Foot brake pedal capable of applying each side of the vehicles brakes independently        |
        | severityOfDescription| and the assembly is unlocked                          |
    And I click on the element with the text "VRM12"
        And I add an "Delayed" defect to the vehicle from a datatable
        | category             | Suspension                                            |
        | section              | IM48 Suspension                                       |
        | subSection           | Anti-roll bars.                                       |
        | description          | An anti-roll bar missing                              |
        | text                 | Anti-roll bar missing                                 |
        | severityOfDescription| fitted as standard, and stability of vehicle affected |
    And I click on the element with the text "VRM12"
    And I add an "Inspection Notice" defect to the vehicle from a datatable
        | category             | Steering                                 |
        | section              | IM30 Steering Control                    |
        | subSection           | Steering Wheel                           |
        | description          | Steering wheel retaining device missing. |
        | text                 | Steering wheel retaining device          |
        | severityOfDescription| missing                                  |
    And I click on the button with the text "Continue Encounter"
    Then I wait on element "#currentEncounter_pagetitle" to be displayed
    Then I click on the button with the text "Defects"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#defectsTitle" to be displayed
    And I click on the element with the text "A111111"
    And I add an "Immediate" defect on trailer 1 from a datatable
        | category             | Brakes                                          |
        | section              | IM37 Service Brake Pedal                        |
        | subSection           | Controls.                                                                         |
        | description          | Foot brake pedal capable of applying each side of the vehicles brakes                 |
        | text                 | Foot brake pedal capable of applying each side of the vehicles brakes independently   |
        | severityOfDescription| and the assembly is unlocked                          |
    And I click on the element with the text "A111111" 
    And I add an "Delayed" defect on trailer 1 from a datatable
        | category             | Bodywork                                            |
        | section              | IM15 Cab Security                                   |
        | subSection           | Cab Security.                                       |
        | description          | Defective attachment of wind deflector to cab roof. |
        | text                 | Defective attachment of wind deflector to cab roof  |
        | severityOfDescription| detachment likely |
    And I click on the element with the text "A111111" 
    And I add an "Inspection Notice" defect on trailer 1 from a datatable
        | category             | Steering                                 |
        | section              | IM30 Steering Control                    |
        | subSection           | Steering Wheel                           |
        | description          | Steering wheel retaining device missing. |
        | text                 | Steering wheel retaining device          |
        | severityOfDescription| missing                                  |
    And I click on the element with the text "A111112" 
    And I add an "Immediate" defect on trailer 2 from a datatable
        | category             | Brakes                                  |
        | section              | IM38 Service Brake Operation            |
        | subSection           | Electronic Braking System               |
        | description          | EBS / ABS warning light inoperative     |
        | text                 | ABS warning lamp not working            |
        | severityOfDescription| MIL inoperative                         |
    And I click on the element with the text "A111112" 
    And I add an "Delayed" defect on trailer 2 from a datatable
        | category             | Suspension                                            |
        | section              | IM48 Suspension                                       |
        | subSection           | Anti-roll bars.                                       |
        | description          | An anti-roll bar missing                              |
        | text                 | Anti-roll bar missing                                 |
        | severityOfDescription| fitted as standard, and stability of vehicle affected |
    And I click on the element with the text "A111112" 
    And I add an "Inspection Notice" defect on trailer 2 from a datatable
        | category             | Steering                                 |
        | section              | IM30 Steering Control                    |
        | subSection           | Steering Wheel                           |
        | description          | Steering wheel retaining device missing. |
        | text                 | Steering wheel retaining device          |
        | severityOfDescription| missing                                  |
    And I click on the button with the text "Continue Encounter"
    Then I wait on element "#currentEncounter_pagetitle" to be displayed
    And I click on the button with the text "Offences"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#offenceTitle" to be displayed
    # fill 'Driver 1' Offences
    When I click on the element "#driverName_0"
    Then I fill in the mandatory offences from a datatable
        | offenceType    | FIXED PENALTY DEFECT     |
        | offenceSubType | BRAKES                   |
        | offence        | BRAKING SYSTEM DEFECTIVE |
    When I click on the element "#driverName_0"
    Then I fill in the mandatory offences with offencegroup from a datatable
        | offenceType    | SEC 2 HOURS & RECORDS              |
        | offenceSubType | FAIL TO PRODUCE                    |
        | offenceGroup   | CHARTS/CARD/P.OUT                         |
        | offence        | EC-FTP RS/CRD/P.OUT- FP ONLY  |
    When I click on the element "#driverName_0"
    Then I fill in the mandatory offences with offencegroup from a datatable
        | offenceType    | SEC 4 TACHOGRAPHS        |
        | offenceSubType | CARDS & CHARTS & RECS    |
        | offenceGroup   | CHARTS                   |
        | offence        | EC-FTP RS/DC/PO-TIL PRO  |
    # fill 'Not Driver' Offences
    And  I click on the element "#otherCardClick"
    Then I fill in the mandatory offences from a datatable
        | offenceType    | FIXED PENALTY DEFECT     |
        | offenceSubType | BRAKES                   |
        | offence        | COMPONENT INSECURE |
    And I click on the element ".yesButton" 
    And  I click on the element "#otherCardClick"
    Then I fill in the mandatory offences with offencegroup from a datatable
        | offenceType    | SEC 2 HOURS & RECORDS              |
        | offenceSubType | FAIL TO PRODUCE                    |
        | offenceGroup   | CHARTS/CARD/P.OUT                          |
        | offence        | EC-FTP RS/CRD/P.OUT 45H  |
    And I click on the element ".yesButton" 
    And  I click on the element "#otherCardClick"
    Then I fill in the mandatory offences with offencegroup from a datatable
        | offenceType    | SEC 4 TACHOGRAPHS        |
        | offenceSubType | CARDS & CHARTS & RECS    |
        | offenceGroup   | CHARTS                   |
        | offence        | EC-FTP RS/DC/PO-TIL PRO  |
    And I click on the element ".yesButton" 
    And I click on the button with the text "Continue Encounter"
    Then I wait on element "#currentEncounter_pagetitle" to be displayed
    Then I click on the element "#EncounterFixedPenaltyButton"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    Then I wait on element "#fixedPenaltyPageTitle" to be displayed
    When I click on the element "#addDriver_0_Offence_0"
    Then I wait on element "smc-general::db-spinner" to not be displayed
    When I fill in the fixed penalties from a datatable
        | paymentMethod | Cash |
        | cashAmount    | 700  |
    And I print all notices
    Then I click on the element "#EncounterNoticeDetailButton"
    And I issue a "Technical Roadside Inspection Report (PG35EC)" notice
        | firstName | john |
        | lastName  | doe  |
    And I issue a "Dangerous Goods Inspection Notice" notice
        | firstName | john |
        | lastName  | doe  |
    And I issue a "Notice of DVSA Traffic Encounter" notice
        | firstName | john |
        | lastName  | doe  |
    And I click on the element "smc-baseionic::backbuttonfinder"
    Then I click on the button with the text "Complete Encounter"