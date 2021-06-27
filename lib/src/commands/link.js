"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = void 0;
const fs_extra_1 = require("fs-extra");
const commander_1 = require("commander");
const utils_1 = require("../utils");
const { src, dst } = utils_1.getConfig();
const ignore = utils_1.getIgnore();
const link = (src, dst, exclude) => {
    utils_1.walk(src, exclude, (path) => {
        const dstPath = path.replace(src, dst);
        if (!fs_extra_1.existsSync(dstPath)) {
            fs_extra_1.ensureLinkSync(path, dstPath);
        }
    });
};
exports.link = link;
exports.default = new commander_1.Command('link')
    .action(() => {
    try {
        if (utils_1.checkPath(src, dst)) {
            exports.link(src, dst, ignore);
        }
    }
    catch (error) {
        utils_1.log.err(error.message);
    }
});
