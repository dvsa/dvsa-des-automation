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

// buildConfig.capabilities = [{
//     browserName: 'chrome',
//     'goog:chromeOptions': {
//         // mobileEmulation: {
//         //     "deviceMetrics": {
//         //         "width": 375,
//         //         "height": 1000
//         //     },
//         //     // userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5)AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/85 Version/11.1.1 Safari/605.1.15",
//         //     deviceName: 'iPad'
//         // },
//         args: [
//             '--disable-infobars',
//             '--window-size=375,1000',
//             '--mobileEmulation={ deviceName: "iPad" }'
//         ],
//     },
// }];

buildConfig.capabilities = [{
  browserName: 'chrome',
  'goog:chromeOptions': {
    // Network emulation requires device mode, which is only enabled when mobile emulation is on
    // mobileEmulation: { deviceName: 'iPhone X' },
    args: [
      '--disable-infobars',
      '--window-size=375,1000',
      // '--headless',
      // '--no-sandbox',
      // '--disable-gpu',
      // '--disable-setuid-sandbox',
      // '--disable-dev-shm-usage'
    ],
  },
}];

buildConfig.port = 9516;

buildConfig.services = (buildConfig.services ? buildConfig.services : []).concat([
  ['chromedriver', {
    chromeDriverArgs: ['--port=9516', '--url-base=\'/\''],
  }],
]);

buildConfig.path = '/';

buildConfig.before = (buildConfig) => {
  browser.url('/');

  // /**
  //  * check if static website is up and cancel if not
  //  */
  //  (browser as WebdriverIO.Browser).url('/');
  //  const pageTitle = (browser as WebdriverIO.Browser).getTitle();
  //  if (pageTitle !== 'Automation Training Application') {
  //      console.error(`Automation Training Application is not up!!, found ${pageTitle}`);
  //      console.log((browser as WebdriverIO.Browser).getPageSource());
  //      process.exit(1);
  //  }
};

buildConfig.beforeFeature = () => {

};

if (process.env.CI) {
  buildConfig.outputDir = path.join(__dirname, 'logs');
}

export const config = buildConfig;
