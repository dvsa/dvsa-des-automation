import StaticServerLauncher from './launcher';
import { StaticServerOptions } from './types';
export default class StaticServerService {
}
export declare const launcher: typeof StaticServerLauncher;
export * from './types';
declare global {
    namespace WebdriverIO {
        interface ServiceOption extends StaticServerOptions {
        }
    }
}
//# sourceMappingURL=index.d.ts.map