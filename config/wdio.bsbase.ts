import { bscreds } from '../creds/bscreds';

export const bsconfig = {
  user: bscreds.user || process.env.BROWSERSTACK_USERNAME,
  key: bscreds.key || process.env.BROWSERSTACK_ACCESS_KEY,
  host: 'hub.browserstack.com',
};
