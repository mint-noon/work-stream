"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const walk_1 = __importDefault(require("./walk"));
const collect = (src, exclude) => {
    const collection = [];
    walk_1.default(src, exclude, (path) => {
        collection.push(path.replace(src, ''));
    });
    return collection;
};
exports.default = collect;
