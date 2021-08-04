import { Command } from 'commander';
import {
    log,
    syncFolders,
    useGit,
    getConfig,
    getIgnore, readFolder,
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
        const srcCollection = readFolder(config.src, ignore);
        const dstCollection1 = readFolder(config.dst, ignore);
        syncFolders(srcCollection, dstCollection1);
        doSync();
        const dstCollection2 = readFolder(config.dst, ignore);
        syncFolders(dstCollection2, srcCollection);
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
