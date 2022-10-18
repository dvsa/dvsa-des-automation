// 17 Scenarios
export const batch1 = [
  './src/features/des/cat-b/SuccessfulTests/*.feature',
  './src/features/des/cat-b/UnsuccessfulTests/*.feature',
  './src/features/des/cat-b/TerminatedTests/*.feature',
  './src/features/des/cat-adi3/SuccessfulTests/*.feature'
];

//23
export const batch2 = [
  './src/features/des/cat-c/SuccessfulTests/*.feature',
  './src/features/des/cat-c/UnsuccessfulTests/*.feature',
  './src/features/des/cat-cm/*.feature',
  './src/features/des/cat-dm/*.feature',
  './src/features/des/cat-cpc/*.feature',
  './src/features/des/mod1/*.feature',
  './src/features/des/mod2/*.feature',
  './src/features/des/cat-adi2/*.feature',
  './src/features/des/cat-d/*.feature',
  './src/features/des/testCentre/*.feature',
  './src/features/des/dashboard/*.feature',
  './src/features/des/journal/*.feature',
  './src/features/des/cat-home/*.feature',
];

export const DESSuites = {
  batchtests: [
    ...batch1,
    ...batch2,
  ],
  desfull: [
    './src/features/des/testCentre/*.feature',
    './src/features/des/dashboard/*.feature',
    './src/features/des/journal/*.feature',
    './src/features/des/cat-b/SuccessfulTests/*.feature',
    './src/features/des/cat-b/UnsuccessfulTests/*.feature',
    './src/features/des/cat-b/TerminatedTests/*.feature',
    './src/features/des/cat-c/SuccessfulTests/*.feature',
    './src/features/des/cat-c/UnsuccessfulTests/*.feature',
    './src/features/des/cat-cm/*.feature',
    './src/features/des/cat-dm/*.feature',
    './src/features/des/cat-d/*.feature',
    './src/features/des/cat-cpc/*.feature',
    './src/features/des/mod1/*.feature',
    './src/features/des/mod2/*.feature',
    './src/features/des/cat-adi2/*.feature',
    './src/features/des/cat-home/*.feature',
    './src/features/des/cat-adi3/SuccessfulTests/*.feature'
  ],
  successfultests: [
    './src/features/des/cat-d/SuccessfulTestWith10Faults.feature',
    './src/features/des/cat-b/SuccessfulTests/SuccessfulTestWith0Faults.feature',
    './src/features/des/cat-b/SuccessfulTests/SuccessfulTestWith15Faults.feature',
    './src/features/des/cat-c/SuccessfulTests/SuccessfulTestWith15Faults.feature',
    './src/features/des/cat-b/SuccessfulTests/SuccessfulTestRekey.feature',
    './src/features/des/cat-cm/SuccessfulTestCatCM.feature',
    './src/features/des/cat-dm/SuccessfulTestCatDM.feature',
    './src/features/des/cat-cpc/SuccessfulTest.feature',
    './src/features/des/mod1/SuccessfulTestCatMod1.feature',
    './src/features/des/mod2/SuccessfulTestCatMod2.feature',
    './src/features/des/cat-adi2/SuccessfulTestCatADI2.feature',
    './src/features/des/cat-home/SuccessfulTestCatG.feature',
    './src/features/des/cat-adi3/SuccessfulTests/*.feature'
  ],
  unsuccessfultests: [
    './src/features/des/cat-d/UnsuccessfulTest.feature',
    './src/features/des/cat-b/UnsuccessfulTests/UnsuccessfulTestWith16Faults.feature',
    './src/features/des/cat-b/UnsuccessfulTests/UnsuccessfulTestWithSeriousFaults.feature',
    './src/features/des/cat-b/UnsuccessfulTests/UnsuccessfulTestWithEyesight.feature',
    './src/features/des/cat-b/UnsuccessfulTests/UnsuccessfulTestWithDangerousFault.feature',
    './src/features/des/cat-c/UnsuccessfulTests/UnsuccessfulTestWithMultipleFaults.feature',
    './src/features/des/cat-cm/UnsuccessfulTestCatCM.feature',
    './src/features/des/cat-b/UnsuccessfulTests/UnsuccessfulTestRekey.feature',
    './src/features/des/cat-dm/UnsuccessfulTestCatDM.feature',
    './src/features/des/cat-d/UnsuccessfulTest.feature',
    './src/features/des/cat-cpc/UnsuccessfulTest.feature',
    './src/features/des/mod1/UnsuccessfulTestCatMod1.feature',
    './src/features/des/mod2/UnsuccessfulTestCatMod2.feature',
    './src/features/des/cat-adi2/UnsuccessfulTestCatADI2.feature',
    './src/features/des/cat-home/UnsuccessfulTestCatH.feature',
  ],
  terminatedtests: [
    './src/features/des/cat-b/TerminatedTests/TerminatedTestswithCode4.feature',
    './src/features/des/cat-b/TerminatedTests/TerminatedTestswithCode21.feature',
    './src/features/des/cat-b/TerminatedTests/TerminatedTestWaitingRoomDeclaration.feature',
    './src/features/des/cat-b/TerminatedTests/TerminatedTestswithCode5.feature',
    './src/features/des/cat-b/TerminatedTests/TerminatedTestsByReturnToTestReport.feature',
    './src/features/des/cat-b/TerminatedTests/TerminatedTestsWaitingRoomToCar.feature',
    '.src/features/des/cat-b/TerminatedTests/TerminatedTestsRekey.feature',
  ],
  rekeysearchtests: [
    './src/features/des/SearchRekeyTests/SearchRekey.feature',
  ],
};
