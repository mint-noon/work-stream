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
    const {doSync} = useGit();

    function syncIteration() {
        mirror(config.src, config.dst, ignore);
        doSync();
        log.info('Synced.');
    }

    if (watch) {
        log.info('Watch...');
        delay = +delay * 1000;

        setInterval(syncIteration, delay);
    } else syncIteration();
};

export default new Command('sync')
    .option('-w, --watch', '')
    .option('-d, --delay <seconds>', '')
    .action((options) => {
        sync(options);
    });
