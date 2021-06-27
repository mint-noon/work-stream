"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const collect_1 = __importDefault(require("./collect"));
const mirror = (src, dst, ignore) => {
    const dstCollection = collect_1.default(dst, ignore);
    for (const file of dstCollection) {
        const srcPath = path_1.join(src, file);
        const dstPath = path_1.join(dst, file);
        if (!fs_extra_1.existsSync(srcPath)) {
            fs_extra_1.writeFileSync(srcPath, fs_extra_1.readFileSync(dstPath));
        }
        const srcStat = fs_extra_1.statSync(srcPath);
        const dstStat = fs_extra_1.statSync(dstPath);
        if (srcStat.mtimeMs < dstStat.mtimeMs) {
            fs_extra_1.writeFileSync(srcPath, fs_extra_1.readFileSync(dstPath));
        }
        if (srcStat.mtimeMs > dstStat.mtimeMs) {
            fs_extra_1.unlinkSync(dstPath);
            fs_extra_1.ensureLinkSync(srcPath, dstPath);
        }
    }
};
exports.default = mirror;
