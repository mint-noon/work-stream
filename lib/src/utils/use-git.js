"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = require("shelljs");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const { dst } = utils_1.getConfig();
exports.default = () => {
    if (!shelljs_1.which('git')) {
        utils_1.log.err('Git is requires!');
    }
    shelljs_1.cd(dst);
    if (shelljs_1.exec('git rev-parse --is-inside-work-tree').code !== 0) {
        utils_1.log.err(`Shared directory must be a git repository: ${dst}`);
    }
    shelljs_1.exec('git checkout master');
    shelljs_1.exec('git pull --ff');
    if (shelljs_1.exec(`git checkout ${constants_1.HOSTNAME}`).code !== 0) {
        shelljs_1.exec(`git branch ${constants_1.HOSTNAME}`);
        utils_1.log.warn(`Create branch for this machine with name '${constants_1.HOSTNAME}'`);
    }
    shelljs_1.exec('git merge -Xtheirs master');
    const commit = () => {
        shelljs_1.exec(`git checkout ${constants_1.HOSTNAME}`);
        shelljs_1.exec('git add --all');
        shelljs_1.exec(`git commit -m ${utils_1.getId()}`);
    };
    const push = () => {
        shelljs_1.exec('git checkout master');
        shelljs_1.exec(`git merge -Xtheirs ${constants_1.HOSTNAME}`);
        shelljs_1.exec('git push');
        shelljs_1.exec(`git checkout ${constants_1.HOSTNAME}`);
    };
    return { commit, push };
};

