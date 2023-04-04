import path from 'path';
import { chunk } from 'lodash';
import fs from 'fs';
import { config as buildConfig } from './wdio.conf';
import DesInfo from './des.info';

import { appiumbase } from './appium.base';
import { DESSuites } from './suites/des.suites';
import {
  createAutomationSimulators, deleteAllAutomationSimulators,
  getAutomationSimulatorUDIDS,
} from '../scripts/generate-sims';

// Change this to increase / decrease number of simulators
const numberOfParallelTests = 12;

// @ts-ignore
function getFiles(dir) {
  const files: string[] = fs.readdirSync(dir).flatMap((item) => {
    const filePath = `${dir}/${item}`;
    if (fs.statSync(filePath).isDirectory()) {
      return getFiles(filePath);
    }
    return filePath;
  });
  return files;
}

buildConfig.baseUrl = '/';
// buildConfig.path = '/'

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
        sessionOverride: false,
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

const getCapabilities = () => {
  const capabilities: any = [];
  Array.from({ length: numberOfParallelTests }, (x, i) => {
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

// const ALL_SUITES: string[] = DESSuites.desfull;
const ALL_SUITES: string[] = getFiles('./src/features') as string[];

// Scale the chunk based upon the number of capabilities being run against
const chunkedFeatures: string[][] = chunk(ALL_SUITES, Math.ceil((ALL_SUITES.length / capabilities.length)));

const config: WebdriverIO.Config = {
  async onPrepare() {
    console.log('++++++++++++++ running on prepare ++++++++++++++');
    await deleteAllAutomationSimulators();
    await createAutomationSimulators(numberOfParallelTests);
    console.log('++++++++++++++ DONE running on prepare ++++++++++++++');
  },
  async onWorkerStart(cid, caps: any) {
    const ids = await getAutomationSimulatorUDIDS();
    const capIndex = parseInt(cid.split('-')[0], 10);
    const simUDID = ids[capIndex];
    console.log(`${cid} using sim ${simUDID} on port ${caps.wdaLocalPort}`);
    // eslint-disable-next-line no-param-reassign
    caps.udid = simUDID;
    caps.derivedDataPath = `${simUDID}`;
    // console.log(caps);
  },
  ...buildConfig,
  capabilities: capabilities.map((capability: any, index: number) => ({
    ...capability,
    // Increase the port by 10 on each iteration of capabilities loop
    wdaLocalPort: (baseCapability.wdaLocalPort + (index * 10)),
    // Remove every feature glob from this list except where capabilities index matches chunkedFeatures features index
    exclude: [
      ...chunkedFeatures.filter((_, i) => i !== index),
    ].reduce(
      // Flatten the features
      (acc, value) => acc.concat(value), [],
    ),
  })),
};

exports.config = config;
