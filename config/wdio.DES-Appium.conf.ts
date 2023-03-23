import path from 'path';
import { chunk } from 'lodash';
import { DeviceName } from '../src/enums/device-type.enum';
import { config as buildConfig } from './wdio.conf';
import DesInfo from './des.info';

import { appiumbase } from './appium.base';
import { DESSuites } from './suites/des.suites';

buildConfig.baseUrl = '/';
buildConfig.maxInstances = 3;

buildConfig.specs = [
  './src/features/des/**/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
  './src/steps/des/*.ts',
);

buildConfig.cucumberOpts!.timeout = 150000; // Allow for the application to install
buildConfig.suites = DESSuites;

buildConfig.services = (buildConfig.services ? buildConfig.services : [])
  .concat([
    ['appium', {
      command: 'appium',
      args: {
        address: '127.0.0.1',
        commandTimeout: '7200',
        sessionOverride: true,
        debugLogSpacing: true,
        relaxedSecurity: true,
      },
      logPath: path.join('./reports/appiumlogs'),
    }],
  ]);

buildConfig.port = 4723;

const baseCapability = {
  platformName: DesInfo.platformName,
  platformVersion: DesInfo.platFormVersion,
  app: DesInfo.localAppPath,
  disableAnimations: true,
  wdaLocalPort: 8210,
};

const capabilities = [
  {
    ...appiumbase,
    ...baseCapability,
    deviceName: DeviceName.iPad9thGen,
  },
  {
    ...appiumbase,
    ...baseCapability,
    deviceName: DeviceName.iPad8thGen,
  },
  {
    ...appiumbase,
    ...baseCapability,
    deviceName: DeviceName.iPadPro10Point5Inch,
  },
  {
    ...appiumbase,
    ...baseCapability,
    deviceName: DeviceName.iPadAir3rdGen,
  },
];

const ALL_SUITES: string[] = [
  ...new Set<string>( // make features distinct if mentioned in multiple suites
    Object.keys(DESSuites)
      .map((key) => DESSuites[key])
      .reduce((accumulator, value) => accumulator.concat(value), []),
  ),
];

// Scale the chunk based upon the number of capabilities being run against
const chunkedFeatures: string[][] = chunk(ALL_SUITES, (ALL_SUITES.length / capabilities.length));

exports.config = {
  capabilities: capabilities.map((capability, index) => ({
    ...capability,
    // Increase the port by 10 on each iteration of capabilities loop
    wdaLocalPort: (baseCapability.wdaLocalPort + (index * 10)),
    // Only grab the index of the chunkedFeatures that correlates to this loop in the capabilities map
    exclude: [
      ...chunkedFeatures.filter((_, i) => i === index),
    ].reduce(
      // Flatten the features
      (acc, value) => acc.concat(value), [],
    ),
  })),
};
