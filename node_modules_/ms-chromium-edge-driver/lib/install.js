"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Fs = require("fs");
var edgePathFile = 'paths.json';
var downloadOnInstall = process.env.npm_config_edgedriver_download_on_install || process.env.EDGEDRIVER_DOWNLOAD_ON_INSTALL;
if (downloadOnInstall) {
    _1.installDriver().then(function (paths) {
        process.stdout.write("MS Edge driver is set: " + JSON.stringify(paths) + "\n");
        Fs.writeFile(edgePathFile, JSON.stringify(paths), function (err) {
            if (err)
                return process.stdout.write(err + "\n");
        });
    });
}
