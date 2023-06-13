// 17 Scenarios
export const batch1 = [
  './src/features/des/cat-b/SuccessfulTests/*.feature',
  './src/features/des/cat-b/UnsuccessfulTests/*.feature',
  './src/features/des/cat-b/TerminatedTests/*.feature',
  './src/features/des/cat-adi3/SuccessfulTests/*.feature',
  './src/features/des/cat-adi3/UnsuccessfulTests/*.feature',
];

// 23
export const batch2 = [
  './src/features/des/cat-c/*/*.feature',
  './src/features/des/cat-c/*/*.feature',
  './src/features/des/cat-cm/*/*.feature',
  './src/features/des/cat-dm/*/*.feature',
  './src/features/des/cat-cpc/*/*.feature',
  './src/features/des/mod1/*/*.feature',
  './src/features/des/mod2/*/*.feature',
  './src/features/des/cat-adi2/*/*.feature',
  './src/features/des/cat-d/*/*.feature',
  // './src/features/des/testCentre/*.feature',
  './src/features/des/dashboard/*.feature',
  './src/features/des/journal/*.feature',
  './src/features/des/cat-home/*/*.feature',
];

export const DESSuites = {
  batchtests: [
    ...batch1,
    ...batch2,
  ],
  desfull: [
    './src/features/des/cat-adi2/*/*.feature',
    './src/features/des/cat-adi3/*/*.feature',
    './src/features/des/cat-b/*/*.feature',
    './src/features/des/cat-c/*/*.feature',
    './src/features/des/cat-cm/*/*.feature',
    './src/features/des/cat-cpc/*/*.feature',
    './src/features/des/cat-d/*/*.feature',
    './src/features/des/cat-dm/*/*.feature',
    './src/features/des/cat-home/*/*.feature',
    './src/features/des/dashboard/*.feature',
    './src/features/des/journal/*.feature',
    './src/features/des/mod1/*/*.feature',
    './src/features/des/mod2/*/*.feature',
    // './src/features/des/SearchRekeyTests/*.feature',
    // './src/features/des/testCentre/*.feature',
  ],
  successfultests: [
    './src/features/des/cat-adi2/SuccessfulTests/*.feature',
    './src/features/des/cat-adi3/SuccessfulTests/*.feature',
    './src/features/des/cat-b/SuccessfulTests/*.feature',
    './src/features/des/cat-c/SuccessfulTests/*.feature',
    './src/features/des/cat-cm/SuccessfulTests/*.feature',
    './src/features/des/cat-cpc/SuccessfulTests/*.feature',
    './src/features/des/cat-d/SuccessfulTests/*.feature',
    './src/features/des/cat-dm/SuccessfulTests/*.feature',
    './src/features/des/cat-home/SuccessfulTests/*.feature',
    './src/features/des/mod1/SuccessfulTests/*.feature',
    './src/features/des/mod2/SuccessfulTests/*.feature',
  ],
  unsuccessfultests: [
    './src/features/des/cat-adi2/UnsuccessfulTests/*.feature',
    './src/features/des/cat-adi3/UnsuccessfulTests/*.feature',
    './src/features/des/cat-b/UnsuccessfulTests/*.feature',
    './src/features/des/cat-c/UnsuccessfulTests/*.feature',
    './src/features/des/cat-cm/UnsuccessfulTests/*.feature',
    './src/features/des/cat-cpc/UnsuccessfulTests/*.feature',
    './src/features/des/cat-d/UnsuccessfulTests/*.feature',
    './src/features/des/cat-dm/UnsuccessfulTests/*.feature',
    './src/features/des/cat-home/UnsuccessfulTests/*.feature',
    './src/features/des/mod1/UnsuccessfulTests/*.feature',
    './src/features/des/mod2/UnsuccessfulTests/*.feature',
  ],
  terminatedtests: [
    './src/features/des/cat-b/TerminatedTests/*.feature',
  ],
  rekeysearchtests: [
    './src/features/des/SearchRekeyTests/SearchRekey.feature',
  ],
  validationtests: [
    'src/features/des/cat-adi3/SuccessfulTests/ValidationChecks.feature',
    'src/features/des/cat-b/SuccessfulTests/ValidationChecks.feature',
  ],
  aditwo: [
    './src/features/des/cat-adi2/*/*.feature',
  ]
};
