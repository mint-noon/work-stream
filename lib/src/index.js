"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const commander_1 = require("commander");
const commands_1 = require("./commands");
const package_json_1 = __importDefault(require("../package.json"));
const program = new commander_1.Command();
const main = (argv) => {
    program
        .version(package_json_1.default.version)
        .addCommand(commands_1.linkCommand)
        .addCommand(commands_1.unlinkCommand)
        .addCommand(commands_1.syncCommand)
        .addCommand(commands_1.configCommand);
    program.parse(argv);
};
exports.main = main;
