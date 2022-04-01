"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWin = exports.isSupportedPlatform = exports.getOS = void 0;
var OS;
(function (OS) {
    OS["WIN32"] = "win32";
    OS["WIN64"] = "win64";
    OS["MAC32"] = "mac32";
    OS["MAC64"] = "mac64";
    OS["LINUX"] = "linux";
})(OS || (OS = {}));
var getOS = function () {
    var platform = process.platform;
    var arch = process.arch;
    if (platform === 'win32') {
        return arch === 'x64' ? OS.WIN64 : OS.WIN32;
    }
    else if (platform === 'darwin') {
        return arch === 'x64' ? OS.MAC64 : OS.MAC32;
    }
    else {
        return OS.LINUX;
    }
};
exports.getOS = getOS;
var isWin = function () {
    return [OS.WIN32, OS.WIN64].includes(getOS());
};
exports.isWin = isWin;
var isSupportedPlatform = function () {
    return [OS.WIN32, OS.WIN64, OS.MAC64].includes(getOS());
};
exports.isSupportedPlatform = isSupportedPlatform;
