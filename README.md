DVSA Automation Framework
====================
#### Requirements

- Node version 14 or higher
- The npm dependencies include private DVSA packages. In order to run `npm i` you will need a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (PAT) in your global `~/.npmrc` file. Your file should contain similar to below:
`//npm.pkg.github.com/:_authToken=<your auth token here>`

- Security
  - [Git secrets](https://github.com/awslabs/git-secrets)
  - [ScanRepo](https://github.com/UKHomeOffice/repo-security-scanner)
    - latest version: scanrepo-0.4.0-darwin-amd64.tar.gz
    - Add to path (using echo $PATH to find your path)
    
## DES Setup

## Dependencies

- Run `npm i` to install and update `npm` package dependencies. The project includes a `postinstall` script which does 2 things:
  1. copies required files sourced from a [common dvsa testing repository](https://github.com/dvsa/dvsa-app-dev-automation) into `./shared`. This folder should not be edited or committed to VCS.
  2. merges json contained in app specific file `./src/element-references/des-element-references.json` with element references from the common repo within `./shared/element-references/common-element-references.json`. The output is saved to `./shared/element-references/combined-element-references.json` and it is this file that is used to decode element references when the tests run. Again, no files. in `./shared` should be edited.

### Apps Folder

In this folder you will need to copy in DES build folder, named "App.app", that is created in the DES4 project.
Creating the DES4 build folder:
- In DES4 project run `npm run e2e-build`
- The build command will not work with Xcode version 12.0> as it is not a supported version.

### Creds Folder

This folder will contain details for all credentials. You will have to create this folder yourself as it is an ignored folder in GitHub.


## Quick start


#### Run a specific spec

*Direct with a config file*
`npx wdio config/wdio.SEARCH-BrowserStack.conf.ts --spec ./src/features/search/login.feature`

*Appium*

npm run wdio:search:ap -- --spec='./src/features/search/login.feature'
npm run wdio:search:ap:focus -- --spec='./src/features/search/login.feature'

*Browser Stack*
npm run wdio:search:bs -- --spec='./src/features/search/login.feature'
npm run wdio:search:bs:focus -- --spec='./src/features/search/login.feature'
#### Run a suite

*Appium*
npm run wdio:search:ap -- --suite=login
npm run wdio:search:ap:focus -- --suite=login

*Browser Stack*
npm run wdio:search:bs -- --suite=login
npm run wdio:search:bs:focus -- --suite=login

# How to run the test

Start the local web server:

```sh
$ yarn run test
```

To run your tests just call the [WDIO runner](http://webdriver.io/guide/testrunner/gettingstarted.html):

```sh
$ yarn run wdio
```

# How to run desktop Edge browser related tests

Ensure Edge for Mac is downloaded

Download the correct Edge drivers according to your versions into root of the repository

Modify the SEARCH-EdgeDesktop to have the matching local edge browser version

```buildConfig.capabilities = [{
    browserName: 'MicrosoftEdge',
    browserVersion: '96.0.1054.57',
    path: '/',
}]```

Start the local web server './msedgedriver -port=4444' on a new terminal console

On a seperate terminal console, run tests/single feature file using the Edge browser configuration as such:

wdio run ./config/wdio.SEARCH-EdgeDesktop.conf.ts "--spec=./src/features/searchdesktop/sift/desktopSiftGB.feature"

# Setup appium

1. install the desktop version of appium
2. npm install -g appium
3. npm install -g appium-doctor

### running appium config

`npx wdio run config/wdio.appium.testapp.conf.ts`
# Configurations

To configure your tests, checkout the [`wdio.conf.js`] file in the config directory. It comes with a bunch of documented options you can choose from.

## Environment-specific configurations

You can setup multiple configs for specific environments. Let's say you want to have a different `baseUrl` for
your local and pre-deploy tests. Use the `wdio.conf.js` to set all general configs (like mochaOpts) that don't change.
They act as default values. For each different environment you can create a new config with the following name
scheme:

```txt
wdio.<ENVIRONMENT>.conf.js
```

Now you can create a specific config for your pre-deploy tests:

__wdio.STAGING.conf.ts__
```js
var config = require('./wdio.conf.js').config;

config.baseUrl = 'http://staging.example.com'

exports.config = config;
```

Your environment-specific config file will get merged into the default config file and overwrites the values you set.
To run a test in a specific environment just add the desired configuration file as the first parameter:

```sh
$ yarn run wdio wdio.STAGING.conf.ts
```

# Running single feature
Sometimes it's useful to only execute a single feature file, to do so use the following command:

```sh
$ npx wdio wdio.conf.ts --spec ./test/features/select.feature
```


# Using tags

If you want to run only specific tests you can mark your features with tags. These tags will be placed before each feature like so:

```gherkin
@Tag
Feature: ...
```

To run only the tests with specific tag(s) use the `--cucumberOpts.tagExpression=` parameter like so:

```sh
$ npx wdio run config/wdio.TESTAPP2.conf.ts --cucumberOpts.tagExpression='@focus'
```

For more tag options please see the [Cucumber.js documentation](https://docs.cucumber.io/tag-expressions/)

# Pending test

If you have failing or unimplemented tests you can mark them as "Pending" so they will get skipped.

```gherkin
// skip whole feature file
@Pending
Feature: ...

// only skip a single scenario
@Pending
Scenario: ...
```

# Common steps

A number of predefined steps are pulled from the [common dvsa repo](https://github.com/dvsa/dvsa-app-dev-automation). As explained above, these are copied into a `./shared` folder.

Anything within `./shared/boilerplate` has been derived from the webdriver team's [cucumber boilerplate repository](https://github.com/dvsa/dvsa-app-dev-automation) with very minor amendments. Descriptions of these steps can be found by visiting that link.

Anything within `./shared/custom` has been tailored for dvsa applications but should be re-usable across apps.  New steps which are likely to be re-usable irrespective of the application should therefore be commited to the shared repository, published and consumed by this repository.

New steps specific only to the DES automation pack can be committed to the `./src` folder here.

## When things go wrong

### If you get an error with something to do with modules and puppetier, it's dead.
    delete the node_modules folder and the package.lock file and then run

`npm i`

### If desktop tests dont spin up, check version of chromedriver
`npm install chromedriver --chromedriver_version=LATEST`

##Unit Tests

To run unit tests with report output to command line:
`npm run test-text-report`

To run unit tests with report output to html file (saved in `coverage` folder):
`npm run test-html-report`
