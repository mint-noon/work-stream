"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const writeConfig = (props) => {
    const config = utils_1.getConfig();
    for (const [key, value] of Object.entries(props)) {
        config[key] = value;
    }
    fs_extra_1.writeJsonSync(constants_1.CONFIG_FILE_PATH, config, { spaces: 2 });
};
exports.default = writeConfig;
