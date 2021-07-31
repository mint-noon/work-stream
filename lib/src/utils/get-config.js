"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const jsonschema_1 = require("jsonschema");
const log_1 = require("../utils/log");
const constants_1 = require("../constants");
exports.defaultConfig = {
    src: path_1.join(constants_1.HOME_DIR, 'Projects'),
    dst: path_1.join(constants_1.HOME_DIR, 'WorkStream'),
    branch: constants_1.HOSTNAME,
    exclude: [
        '.git',
        '.gitignore',
        'node_modules',
        '.wsignore'
    ]
};
const configSchema = {
    id: '/Config',
    title: 'Config',
    type: 'object',
    properties: {
        src: {
            type: 'string',
        },
        dst: {
            type: 'string',
        },
        exclude: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
    required: ['src', 'dst', 'exclude'],
};
const getConfig = () => {
    if (!fs_extra_1.existsSync(constants_1.CONFIG_FILE_PATH)) {
        fs_extra_1.ensureFileSync(constants_1.CONFIG_FILE_PATH);
        fs_extra_1.writeJsonSync(constants_1.CONFIG_FILE_PATH, exports.defaultConfig, { spaces: 2 });
        log_1.warn(`Default config file created in: ${constants_1.CONFIG_FILE_PATH}`);
    }
    const config = fs_extra_1.readJsonSync(constants_1.CONFIG_FILE_PATH);
    if (jsonschema_1.validate(config, configSchema)) {
        return config;
    }
    log_1.warn('Config file is wrong, use default');
    return exports.defaultConfig;
};
exports.default = getConfig;
