import {
    ensureFileSync,
    existsSync,
    readFileSync,
    writeFileSync,
} from 'fs-extra';
import { join } from 'path';
import getConfig from './get-config';
import {warn} from './log';
import {
    IGNORE_FILE_NAME,
} from '../constants';

const { dst, exclude } = getConfig();

const getIgnore = (): string[] => {
    const ignorePath = join(dst, IGNORE_FILE_NAME);

    let ignore = exclude;

    if(!existsSync(ignorePath)) {
        ensureFileSync(ignorePath);
        writeFileSync(ignorePath, exclude.join('\n'));
        warn(`Default ignore file created at: ${ignorePath}`);
    } else {
        ignore = [...exclude, ...readFileSync(ignorePath, 'utf-8').split('\n')];
    }

    ignore = [...new Set([...ignore.map(s=>s.trim())])]; // trim, because line endings might be different

    return ignore;
};

export default getIgnore;
