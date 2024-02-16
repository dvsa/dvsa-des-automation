import path from 'path';
import CustomCommand from '../shared/custom/support/lib/addCommands';

// Uncomment to enable video reporter
// const video = require('wdio-video-reporter');

// @ts-ignore
export const config: WebdriverIO.Config = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
    tsConfigPathsOpts: {
      baseUrl: './',
      paths: {
        '@shared-boilerplate/*': ['shared/boilerplate/*'],
        '@shared-custom/*': ['shared/custom/*'],
        '@shared-helpers/*': ['shared/helpers/*'],
      },
    },
  },
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: 'local',
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    './src/features/**/*.feature',
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 10,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{

    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    maxInstances: 10,
    //
    browserName: 'chrome',
    // If outputDir is provided WebdriverIO can capture driver session logs
    // it is possible to configure which logTypes to include/exclude.
    // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    // excludeDriverLogs: ['bugreport', 'server'],
    allowTouchIdEnroll: true,
  }],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'debug',
  // outputDir: path.join(__dirname, '/logs'),
  outputDir: path.join('./reports/logs'),
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  //   @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner, @wdio/lambda-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/applitools-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // baseUrl: 'http://localhost:8080',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 60000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ['shared-store'],
  //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'cucumber',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  specFileRetries: 3,
  //
  // Whether or not retried specfiles should be retried immediately or deferred
  // to the end of the queue specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html
  // reporters: ['spec'],
  reporters: [
    'spec',
    //
    // Uncomment to enable video reporter
    //
    // [video, {
    //   saveAllVideos: true, // If true, also saves videos for successful test cases
    // eslint-disable-next-line max-len
    //   videoSlowdownMultiplier: 10, // Higher to get slower videos, lower for faster videos [Value 1-100]
    //   videoRenderTimeout: 5, // Max seconds to wait for a video to finish rendering
    // }],
    ['allure', {
      outputDir: './reports/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      useCucumberStepReporter: false,
    }],
    ['cucumberjs-json', {
      jsonFolder: './reports/json-results',
      language: 'en',
    },
    ],

  ],

  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    featureDefaultLanguage: 'en',
    backtrace: false, // <boolean> show full backtrace for errors
    requireModule: [], // <string[]> module used for processing required features
    failAmbiguousDefinitions: true, // <boolean< Treat ambiguous definitions as errors
    // dryRun: false, // <boolean> invoke formatters without executing steps
    failFast: false, // <boolean> abort the run on first failure
    // eslint-disable-next-line max-len
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings
    // <string[]> ("extension:module") require files with the given
    // EXTENSION after requiring MODULE (repeatable)
    names: [],
    snippets: true, // <boolean> hide step definition snippets for pending steps
    source: true, // <boolean> hide source uris
    profile: [], // <string[]> (name) specify the profile to use
    require: [
      './shared/boilerplate/steps/*.ts',
      './shared/custom/steps/**/*.ts',
      './shared/helpers/*.ts',
      // Or search a (sub)folder for JS files with a wildcard
      // works since version 1.1 of the wdio-cucumber-framework
      // './src/**/*.js',
    ],
    scenarioLevelReporter: false,
    order: 'defined',
    snippetSyntax: undefined, // <string> specify a custom snippet syntax
    strict: true, // <boolean> fail if there are any undefined or pending steps
    tagExpression: 'not @Pending',
    tagsInTitle: false, // <boolean> add cucumber tags to feature or scenario name
    timeout: 120000, // <number> timeout for step definitions
  } as WebdriverIO.CucumberOpts,

  afterScenario: async () => {
    // Comment out this locally if you don't want to clear storage
    console.info('clearing local storage before scenario');
    await browser.execute('window.localStorage.clear()');
    await browser.reloadSession();
  },

  afterStep: (step, scenario, result) => {
    if (!result.passed) {
      browser.takeScreenshot();
    }
  },

  beforeStep: (step) => {
    console.log(`  STEP :   ${JSON.stringify(step.text)}`);
  },

  before: async () => {
    // Comment out this locally if you don't want to clear storage
    console.info('clearing local storage before scenario');
    await browser.execute('window.localStorage.clear()');
    await browser.reloadSession();
    await CustomCommand.addCommands();
    driver.toggleEnrollTouchId(true);
  },
};
