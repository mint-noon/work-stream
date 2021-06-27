"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGNORE_FILE_NAME = exports.CONFIG_FILE_PATH = exports.HOSTNAME = exports.HOME_DIR = void 0;
const os_1 = require("os");
const path_1 = require("path");
exports.HOME_DIR = os_1.homedir();
exports.HOSTNAME = os_1.hostname();
exports.CONFIG_FILE_PATH = path_1.join(exports.HOME_DIR, '.config/wost/config.json');
exports.IGNORE_FILE_NAME = '.wsignore';
