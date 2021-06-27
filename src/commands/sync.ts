import { Command } from 'commander';
import {
    log,
    mirror,
    useGit,
    minToMs,
    getConfig,
    getIgnore,
} from '../utils';
import type {WatchOptions} from '../types';

const config = getConfig();
const ignore = getIgnore();

export const sync = ({
    watch = false,
    delay = 2,
}: WatchOptions): void => {
    const {commit, push} = useGit();

    commit();
    mirror(config.src, config.dst, ignore);
    push();

    if (watch) {
        log.info('Watch...');
        delay = minToMs(+delay);

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
    .option('-d, --delay <minutes>', '')
    .action((options) => {
        sync(options);
    });
