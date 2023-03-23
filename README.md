# DES - Front end automation pack

## Requirements
- Node - 16.11.0
- MacBook with `Xcode`
- The `npm` dependencies include private `DVSA` packages. In order to run `npm i` you will need a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (PAT) in your global `~/.npmrc` file. Your file should contain similar to below:
`//npm.pkg.github.com/:_authToken=<your auth token here>`

- Security
  - [Git secrets](https://github.com/awslabs/git-secrets)
  - [ScanRepo](https://github.com/UKHomeOffice/repo-security-scanner)
    - Unzip `repo-security-scanner_<version>_Darwin_<arch>.tar.gz` and rename the executable inside the folder to `scanrepo` - Add executable to path (using `echo $PATH` to find your path)

## Setup
- Run `npm ci` to install dependencies from the `package-lock.json`
  1. The `postinstall` script runs which merges local and remote element references 
  2. The `postinstall` also copies the shared steps required from the common package into `shared/`

## Apps Folder
  1. In [DES Mobile App](https://github.com/dvsa/des-mobile-app/), run `npm run build:test`
  2. This will create the required App file needed here `e2e-app/App.app`
  3. Copy the generated `App.app` file from [DES Mobile App](https://github.com/dvsa/des-mobile-app/) into the `apps` folder of this repository

## Credentials Folder
This folder will contain details for all credentials. You will have to create this folder yourself as it is an ignored folder in GitHub.
1. Create `creds/` folder at root of repository

## How to run the test(s)
There are multiple variants on the configuration that can be used to run tests, all of which can be found inside the `package.json` with the prefix of 
`npm run wdio:des/*`

#### Run all tests
`npm run wdio:des:ap`

#### Run a single feature
`npm run wdio:des:ap --spec ./src/features/des/cat-b/SuccessfulTests/SuccessfulTestWith0Faults.feature`

#### Run a suite
`npm run wdio:des:ap -- --suite=desfull`

If wishing to run on `BrowserStack` instead of locally, then use `:bs` instead of `:ap` in the above commands.

## Reports
After running the tests you can run `npm run report` to open up the allure report page

To clean down the reports then run `npm run report:clean`

## Using tags

If you want to run only specific tests you can mark your features with tags. These tags will be placed before each feature like so:

```gherkin
@Tag
Feature: ...
```

To run only the tests with specific tag(s) use the `--cucumberOpts.tagExpression=`, an example of this found here...
`npm run wdio:des:ap:test`

For more tag options please see the [Cucumber.js documentation](https://docs.cucumber.io/tag-expressions/)

## Pending test

If you have failing or unimplemented tests you can mark them as "Pending" so they will get skipped.

```gherkin
// skip whole feature file
@Pending
Feature: ...

// only skip a single scenario
@Pending
Scenario: ...
```

## Common steps

A number of predefined steps are pulled from the [common dvsa repo](https://github.com/dvsa/dvsa-app-dev-automation). As explained above, these are copied into a `./shared` folder.

Anything within `./shared/boilerplate` has been derived from the webdriver team's [cucumber boilerplate repository](https://github.com/dvsa/dvsa-app-dev-automation) with very minor amendments. Descriptions of these steps can be found by visiting that link.

Anything within `./shared/custom` has been tailored for dvsa applications but should be re-usable across apps.  New steps which are likely to be re-usable irrespective of the application should therefore be commited to the shared repository, published and consumed by this repository.

New steps specific only to the DES automation pack can be committed to the `./src` folder here.

## Troubleshooting
 1. If errors arise that you suspect have come from `node_modules`, then run `npm ci` which will clean install based on versions found inside the `package-lock.json`
 2. Check the Node (`node -v`) and NPM (`npm -v`) version you are using complies with requirements of repository
 3. Check via `XCode -> Window -> Devices and Simulators` you have the required `localDeviceName` and `platFormVersion` specified here `config/des.info.ts`
