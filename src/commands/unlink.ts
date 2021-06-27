import {
    removeSync,
    readdirSync,
} from 'fs-extra';
import path from 'path';
import {Command} from 'commander';
import {
    log,
    getConfig,
} from '../utils';

const { dst }= getConfig();

export const unlink = (target: string) => {
    const files = readdirSync(target);

    for (const file of files){
        const absolutePath = path.join(target, file);
        removeSync(absolutePath);
    }
};

export default new Command('unlink')
    .action(() => {
        try {
            unlink(dst);
        } catch (error) {
            log.err(error.message);
        }
    });
