import type { Services } from '@wdio/types';
import { FolderOption, MiddleWareOption } from './types';
export default class StaticServerLauncher implements Services.ServiceInstance {
    private _folders;
    private _port;
    private _middleware;
    private _server?;
    constructor({ folders, port, middleware }: {
        folders?: FolderOption[] | FolderOption;
        port?: number;
        middleware?: MiddleWareOption[];
    });
    onPrepare({ outputDir }: {
        outputDir?: string;
    }): Promise<void>;
}
//# sourceMappingURL=launcher.d.ts.map