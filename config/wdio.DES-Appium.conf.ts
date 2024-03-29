/* eslint-disable no-unused-vars */
import path from 'path';
import fs from 'fs';
import { chunk } from 'lodash';
import { config as buildConfig } from './wdio.conf';

import { appiumbase } from './appium.base';
import { DESSuites } from './suites/des.suites';
import { DeviceName, IOSVersion } from '../src/enums/device-type.enum';
import { createAutomationSimulators, getAutomationSimulatorUDIDS } from '../scripts/generate-sims';

/**
 * ===============================================================================
 * Update the constants below to change the number of sims to run tests across,
 * simulator model or iOS version (SDK for selected ios must be installed in xcode)
 * ===============================================================================
 */
const numberOfParallelTests = 4;
const simulatorModel: DeviceName = DeviceName.iPad8thGen;
const iosVersion: IOSVersion = IOSVersion.seventeenTwo;

let startTime: string;
let endTime: string;

const getAllFiles = (dirPath: string, arrayOfFiles?: string[]) => {
  const files = fs.readdirSync(dirPath);

  // eslint-disable-next-line no-param-reassign
  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      // eslint-disable-next-line no-param-reassign
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
    } else {
      const filePath = path.join(dirPath, '/', file);
      // @ts-ignore
      arrayOfFiles.push(`${filePath}`);
    }
  });

  return arrayOfFiles;
};

buildConfig.baseUrl = '/';

buildConfig.specs = [
  './src/features/des/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
  './src/steps/des/*.ts',
);

buildConfig.cucumberOpts!.timeout = 150000; // Allow for the application to install
buildConfig.suites = DESSuites;

buildConfig.services = (buildConfig.services ? buildConfig.services : []).concat([
  ['appium', {
    command: 'appium',
    args: {
      address: '127.0.0.1',
      commandTimeout: '7200',
      sessionOverride: false,
      debugLogSpacing: true,
      relaxedSecurity: true,
    },
    logPath: path.join('./reports/appiumlogs'),
  }],
]);

buildConfig.port = 4723;

const baseCapability = {
  platformName: 'iOS',
  platformVersion: iosVersion,
  app: './apps/App.app',
  wdaLocalPort: 8210,
};

const getCapabilities = () => {
  const capabilities: any = [];
  // eslint-disable-next-line array-callback-return
  Array.from({ length: numberOfParallelTests }, () => {
    capabilities.push(
      {
        ...appiumbase,
        ...baseCapability,
      },
    );
  });
  return capabilities;
};

const capabilities: any = getCapabilities();

buildConfig.maxInstances = numberOfParallelTests;

const ALL_SUITES: string[] = getAllFiles('./src/features/des') as string[];

// Scale the chunk based upon the number of capabilities being run against
const chunkedFeatures: string[][] = chunk(ALL_SUITES, Math.ceil((ALL_SUITES.length / numberOfParallelTests)));

const config: WebdriverIO.Config = {
  async onPrepare(configuration, caps) {
    startTime = new Date().toTimeString();
    await createAutomationSimulators(numberOfParallelTests, simulatorModel, iosVersion);
  },
  onComplete() {
    endTime = new Date().toTimeString();
    console.log(`*********** test run complete. START: ${startTime} END: ${endTime}`);
  },
  async onWorkerStart(cid, caps: any, specs) {
    const ids = await getAutomationSimulatorUDIDS(simulatorModel, iosVersion);
    const capIndex = parseInt(cid.split('-')[0], 10);
    const simUDID = ids[capIndex];
    console.log(`${cid} using sim ${simUDID} on port ${caps.wdaLocalPort}`);
    // eslint-disable-next-line no-param-reassign
    caps.udid = simUDID; //  specify individual sim here if required, e.g '8E6D7AF9-D366-45E6-8947-7637E94D4B81';
    // eslint-disable-next-line no-param-reassign
    caps.derivedDataPath = `${simUDID}`;
  },
  ...buildConfig,
  capabilities: capabilities.map((capability: any, index: number) => ({
    ...capability,
    // Increase the port by 10 on each iteration of capabilities loop
    wdaLocalPort: (baseCapability.wdaLocalPort + (index * 10)),
    // Remove every feature glob from this list except where capabilities index matches chunkedFeatures features index
    exclude: [...chunkedFeatures.filter((_, chunkIndex) => chunkIndex !== index)]
      .reduce(
        //   // Flatten the features
        (acc, value) => acc.concat(value), [],
      ),
  })),
};

exports.config = config;
