"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = exports.success = exports.info = exports.err = void 0;
const chalk_1 = __importDefault(require("chalk"));
const err = (...text) => {
    process.stderr.write(chalk_1.default.stderr.red.bgWhite('ERROR:'));
    process.stderr.write(chalk_1.default.stderr.red(' ', ...text, '\n'));
};
exports.err = err;
const info = (...text) => {
    process.stderr.write(chalk_1.default.stderr.blue.bgWhite('INFO:'));
    process.stdout.write(chalk_1.default.blue(' ', ...text, '\n'));
};
exports.info = info;
const success = (...text) => {
    process.stderr.write(chalk_1.default.stderr.green.bgWhite('OK:'));
    process.stdout.write(chalk_1.default.green(' ', ...text, '\n'));
};
exports.success = success;
const warn = (...text) => {
    process.stderr.write(chalk_1.default.stderr.yellow.bgWhite('WARN:'));
    process.stdout.write(chalk_1.default.yellow(' ', ...text, '\n'));
};
exports.warn = warn;
