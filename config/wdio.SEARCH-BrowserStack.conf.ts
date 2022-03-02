import path from 'path';
import { config as buildConfig } from './wdio.conf';
import { bscapabilities, bsconfig } from './wdio.bsbase';
import SearchInfo from './search.info';
import { SearchSuites } from './suites/search.suites';

buildConfig.baseUrl = '/';
buildConfig.maxInstances = 10;

buildConfig.specs = [
  './src/features/search/**/*.feature',
];

buildConfig.cucumberOpts!.require!.push(
  './src/steps/search/*.ts',
);

buildConfig.suites = SearchSuites;

buildConfig.services = (buildConfig.services ? buildConfig.services : []).concat([
  'browserstack',
]);

buildConfig.onPrepare = async () => {
  // browser.setTimeout({ 'pageLoad': 10000 });
};

exports.config = {
  ...buildConfig,
  ...bsconfig,
  capabilities: [
    {
      ...bscapabilities,
      os_version: SearchInfo.platFormVersion,
      device: SearchInfo.deviceName,
      platformName: SearchInfo.platformName,
      app: SearchInfo.appName,
      project: SearchInfo.projectName,
      build: 'Search WDIO Browserstack',
      name: bsconfig.user,
      'browserstack.appium_version': '1.18.0',
      'browserstack.idle.timeout': 150,
    },
  ],
};
