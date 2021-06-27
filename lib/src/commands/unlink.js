"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlink = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const utils_1 = require("../utils");
const { dst } = utils_1.getConfig();
const unlink = (target) => {
    const files = fs_extra_1.readdirSync(target);
    for (const file of files) {
        const absolutePath = path_1.default.join(target, file);
        fs_extra_1.removeSync(absolutePath);
    }
};
exports.unlink = unlink;
exports.default = new commander_1.Command('unlink')
    .action(() => {
    try {
        exports.unlink(dst);
    }
    catch (error) {
        utils_1.log.err(error.message);
    }
});
