import {
    existsSync,
    ensureLinkSync,
} from 'fs-extra'
import {Command} from 'commander'
import {
    walk,
    getConfig,
    getIgnore,
    checkPath,
    log,
} from '../utils'

const config = getConfig()
const ignore = getIgnore()

export const link = (src: string, dst: string, exclude: string[]): void => {
    walk(src, exclude, (path: string) => {
        ensureLinkSync(path, path.replace(src, dst))
    })
}

export default new Command('link')
    .version('0.1.0')
    .argument('[src]', '')
    .argument('[dst]', '')
    .action((src, dst) => {
        if (!src) src = config.src
        if (!dst) dst = config.dst

        try {
            if (checkPath(src, dst)) {
                link(src, dst, ignore)
            }

        } catch (error) {
            log.err(error.message)
        }
    })
