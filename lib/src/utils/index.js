"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walk = exports.log = exports.writeConfig = exports.mirror = exports.useGit = exports.getIgnore = exports.getId = exports.getConfig = exports.collect = exports.checkPath = void 0;
var check_path_1 = require("./check-path");
Object.defineProperty(exports, "checkPath", { enumerable: true, get: function () { return __importDefault(check_path_1).default; } });
var collect_1 = require("./collect");
Object.defineProperty(exports, "collect", { enumerable: true, get: function () { return __importDefault(collect_1).default; } });
var get_config_1 = require("./get-config");
Object.defineProperty(exports, "getConfig", { enumerable: true, get: function () { return __importDefault(get_config_1).default; } });
var get_id_1 = require("./get-id");
Object.defineProperty(exports, "getId", { enumerable: true, get: function () { return __importDefault(get_id_1).default; } });
var get_ignore_1 = require("./get-ignore");
Object.defineProperty(exports, "getIgnore", { enumerable: true, get: function () { return __importDefault(get_ignore_1).default; } });
var use_git_1 = require("./use-git");
Object.defineProperty(exports, "useGit", { enumerable: true, get: function () { return __importDefault(use_git_1).default; } });
var mirror_1 = require("./mirror");
Object.defineProperty(exports, "mirror", { enumerable: true, get: function () { return __importDefault(mirror_1).default; } });
var write_config_1 = require("./write-config");
Object.defineProperty(exports, "writeConfig", { enumerable: true, get: function () { return __importDefault(write_config_1).default; } });
exports.log = __importStar(require("./log"));
var walk_1 = require("./walk");
Object.defineProperty(exports, "walk", { enumerable: true, get: function () { return __importDefault(walk_1).default; } });
