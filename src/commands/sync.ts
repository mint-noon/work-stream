import { Command } from 'commander';
import {
    log,
    mirror,
    useGit,
    getConfig,
    getIgnore,
} from '../utils';
import type {WatchOptions} from '../types';

const config = getConfig();
const ignore = getIgnore();

/**
 *
 *
 * @param {WatchOptions} options -
 */
export const sync = ({
    watch = false,
    delay = 45,
}: WatchOptions): void => {
    const {commit, push} = useGit();

    mirror(config.src, config.dst, ignore);
    commit();
    push();

    if (watch) {
        log.info('Watch...');
        delay = +delay * 1000;

        setInterval(() => {
            mirror(config.src, config.dst, ignore);
            commit();
            push();
            log.info('Watch...');
        }, delay);
    }
};

export default new Command('sync')
    .option('-w, --watch', '')
    .option('-d, --delay <seconds>', '')
    .action((options) => {
        sync(options);
    });
