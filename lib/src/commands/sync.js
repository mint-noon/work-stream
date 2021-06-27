"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sync = void 0;
const commander_1 = require("commander");
const utils_1 = require("../utils");
const config = utils_1.getConfig();
const ignore = utils_1.getIgnore();
const sync = ({ watch = false, delay = 2, }) => {
    const { commit, push } = utils_1.useGit();
    commit();
    utils_1.mirror(config.src, config.dst, ignore);
    push();
    if (watch) {
        utils_1.log.info('Watch...');
        delay = utils_1.minToMs(+delay);
        setInterval(() => {
            utils_1.mirror(config.src, config.dst, ignore);
            commit();
            push();
            utils_1.log.info('Watch...');
        }, delay);
    }
};
exports.sync = sync;
exports.default = new commander_1.Command('sync')
    .option('-w, --watch', '')
    .option('-d, --delay <minutes>', '')
    .action((options) => {
    exports.sync(options);
});
