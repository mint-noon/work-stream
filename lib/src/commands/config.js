"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const utils_1 = require("../utils");
exports.default = new commander_1.Command('config')
    .description('Call without flags to see your config file')
    .option('-s, --src <target>', 'Absolute path to source directory')
    .option('-d, --dst <target>', 'Absolute path to destination directory')
    .option('-b, --branch <name>', 'Name for this machine working branch')
    .action((options) => {
    utils_1.writeConfig(options);
    utils_1.log.success(JSON.stringify(utils_1.getConfig(), null, 2));
});
