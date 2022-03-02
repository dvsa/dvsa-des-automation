import path from 'path';
import { config as buildConfig } from './wdio.conf';
import { Testapp2Suites } from './suites/testapp2.suites';

buildConfig.baseUrl = 'http://localhost:8100';

buildConfig.specs = [
  './src/features/testapp2/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
  './src/steps/testapp2/*.ts',
);

buildConfig.suites = Testapp2Suites;

buildConfig.capabilities = [{
  browserName: 'chrome',
  'goog:chromeOptions': {
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
}];

buildConfig.port = 9516;

buildConfig.services = (buildConfig.services ? buildConfig.services : []).concat([
  [
    'chromedriver',
    {
      chromeDriverArgs: ['--port=9516', '--url-base=\'/\''],
    },
  ],
]);

buildConfig.path = '/';

buildConfig.before = (buildConfig) => {
  browser.url('/');
};

buildConfig.beforeFeature = () => {
};

if (process.env.CI) {
  buildConfig.outputDir = path.join(__dirname, 'logs');
}

export const config = buildConfig;
