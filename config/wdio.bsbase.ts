import { bscreds } from '../creds/bscreds';

export const bsconfig = {
    user: bscreds.user || process.env.BROWSERSTACK_USERNAME,
    key: bscreds.key || process.env.BROWSERSTACK_ACCESS_KEY,
    host: 'hub.browserstack.com'
}

export const bscapabilities = {
    acceptSslCert: true,
    disableAnimations: true,
    'browserstack.debug': true,
    'browserstack.local': false,
    'browserstack.networkLogs': true,
    'browserstack.acceptInsecureCerts': true,
    'browserstack.appiumLogs': true,
    'browserstack.deviceLogs': true,
    'os_version': '10',
    'resolution': '1920x1080',
    'browserName': 'Chrome',
    'browser_version': 'latest',
    'os': 'Windows',
    fullContextList: true,
    autoWebview: true,
    autoAcceptAlerts: true,
}
