/// <reference types="node" />
import { readFile as readFileCb, writeFile as writeFileCb, unlink } from 'fs';
export declare const readFile: typeof readFileCb.__promisify__;
export declare const writeFile: typeof writeFileCb.__promisify__;
export declare const deleteFile: typeof unlink.__promisify__;
export declare const getPidPath: (pid: number) => string;
//# sourceMappingURL=utils.d.ts.map