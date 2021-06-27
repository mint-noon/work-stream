import {
    existsSync,
    ensureLinkSync,
} from 'fs-extra';
import {Command} from 'commander';
import {
    walk,
    getConfig,
    getIgnore,
    checkPath,
    log,
} from '../utils';

const {src, dst} = getConfig();
const ignore = getIgnore();

export const link = (src: string, dst: string, exclude: string[]): void => {
    walk(src, exclude, (path: string) => {
        const dstPath = path.replace(src, dst);

        if (!existsSync(dstPath)) {
            ensureLinkSync(path, dstPath);
        }
    });
};

export default new Command('link')
    .action(() => {
        try {
            if (checkPath(src, dst)) {
                link(src, dst, ignore);
            }

        } catch (error) {
            log.err(error.message);
        }
    });
