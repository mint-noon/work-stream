"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const get_config_1 = __importDefault(require("./get-config"));
const log_1 = require("./log");
const constants_1 = require("../constants");
const { dst, exclude } = get_config_1.default();
const getIgnore = () => {
    const ignorePath = path_1.join(dst, constants_1.IGNORE_FILE_NAME);
    let ignore = exclude;
    if (!fs_extra_1.existsSync(ignorePath)) {
        fs_extra_1.writeFileSync(ignorePath, exclude.join('\n'));
        log_1.warn(`Default ignore file created at: ${ignorePath}`);
    }
    else {
        ignore = fs_extra_1.readFileSync(ignorePath, 'utf-8').split('\n');
    }
    return ignore;
};
exports.default = getIgnore;
