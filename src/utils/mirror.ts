import {
    statSync,
    unlinkSync,
    readFileSync,
    writeFileSync,
    ensureLinkSync,
    existsSync,
} from 'fs-extra';
import { join } from 'path';
import collect from './collect';

/**
 * Dest directory will be a hard-link mirror for the source directory
 *
 * @param {string} src - mirrored directory
 * @param {string} dst - directory mirror
 * @param {string} ignore - file to be excluded
 */
const mirror = (src: string, dst: string, ignore: string[]): void => {
    const dstCollection = collect(dst, ignore);

    for (const file of dstCollection) {
        const srcPath = join(src, file);
        const dstPath = join(dst, file);

        if (!existsSync(srcPath)) {
            writeFileSync(srcPath, readFileSync(dstPath));
        }

        const srcStat = statSync(srcPath);
        const dstStat = statSync(dstPath);

        if (srcStat.mtimeMs < dstStat.mtimeMs) {
            writeFileSync(srcPath, readFileSync(dstPath));
        }
        if (srcStat.mtimeMs > dstStat.mtimeMs) {
            unlinkSync(dstPath);
            ensureLinkSync(srcPath, dstPath);
        }
    }
};

export default mirror;
