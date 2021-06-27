"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const difference_1 = __importDefault(require("lodash/difference"));
const log_1 = require("./log");
const walk = (src, exclude, fn) => {
    if (!fs_extra_1.existsSync(src)) {
        log_1.err(`File is not exist: ${src}`);
    }
    const validFiles = difference_1.default(fs_extra_1.readdirSync(src), exclude);
    for (const file of validFiles) {
        const absolutePath = path_1.join(src, file);
        const stat = fs_extra_1.statSync(absolutePath);
        if (stat.isDirectory()) {
            walk(absolutePath, exclude, fn);
        }
        else {
            fn(absolutePath);
        }
    }
};
exports.default = walk;
