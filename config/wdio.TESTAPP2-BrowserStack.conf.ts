import { config as buildConfig } from './wdio.conf';
import { bsconfig, bscapabilities } from './wdio.bsbase';
import SearchInfo from './search.info';

import { Testapp2Suites } from './suites/testapp2.suites';

var browserstack = require('browserstack-local');

buildConfig.baseUrl = 'http://localhost:8100';
buildConfig.maxInstances = 5;

buildConfig.specs = [
  './src/features/testapp2/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
  './src/steps/testapp2/*.ts',
);

buildConfig.suites = Testapp2Suites;

buildConfig.onPrepare = async () => {
  console.log('Connecting local');
  await new Promise((resolve, reject) => {
    exports.bs_local = new browserstack.Local();
    exports.bs_local.start({ key: bsconfig.key }, (error: any) => {
      if (error) return reject(error);

      console.log('Connected. Now testing...');
      resolve(true);
    });
  });
};

buildConfig.before = async (capabilities: any, specs: string[], browser: any) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Running Before Script <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
  browser.setTimeout({ pageLoad: 10000 });
  browser.url('/');

  // Wait for the application to load
  browser.waitUntil(() => {
    const state = browser.execute(() => document.readyState);
    // console.log("state:" + state)
    return state === 'complete';
  },
  {
    timeout: 60000, // 60secs
    interval: 100,
    timeoutMsg: 'Oops! Check your internet connection',
  });
};

buildConfig.onComplete = (capabilties, specs) => new Promise((resolve, reject) => {
  exports.bs_local.stop(() => {
    console.log('Binary stopped');
    resolve(true);
  });
});

exports.config = {
  ...buildConfig,
  ...bsconfig,
  capabilities: [{
    name: 'WDIO Testapp 2',
    build: 'Testapp2 Build 1',
    'browserstack.debug': true,
    'browserstack.local': true,
    browserstackLocal: true,
    'browserstack.networkLogs': true,
    os: 'Windows',
    os_version: '10',
    resolution: '1920x1080',
    browserName: 'Chrome',
    browser_version: 'latest',
    acceptSslCert: true,
    javascriptEnabled: true,
    locationContextEnabled: true,
    chromeOptions: {
      args: [
        '--disable-infobars',
        '--window-size=375,1000',
        // '--headless',
        '--no-sandbox',
        // '--disable-gpu',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    },
  }],
};
