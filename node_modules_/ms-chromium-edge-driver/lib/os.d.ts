declare enum OS {
    WIN32 = "win32",
    WIN64 = "win64",
    MAC32 = "mac32",
    MAC64 = "mac64",
    LINUX = "linux"
}
declare const getOS: () => OS;
declare const isWin: () => boolean;
declare const isSupportedPlatform: () => boolean;
export { getOS, isSupportedPlatform, isWin };
