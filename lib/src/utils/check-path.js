"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
exports.default = (...paths) => {
    for (const path of paths) {
        if (!fs_extra_1.existsSync(path)) {
            throw new Error(`Path is not exist: ${path}`);
        }
    }
    return true;
};
