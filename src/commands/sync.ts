import { Command } from 'commander'
import {
    log,
    mirror,
    useGit,
    minToMs,
    getConfig,
    getIgnore,
} from '../utils'
import type {WatchOptions} from '../types'

const config = getConfig()
const ignore = getIgnore()

export const sync = ({
    watch = false,
    delay = 2,
}: WatchOptions) => {
    const {commit, push} = useGit()

    commit()
    mirror(config.src, config.dst, ignore)
    push()

    if (watch) {
        log.info('Watch...')
        delay = minToMs(+delay)

        setInterval(() => {
            mirror(config.src, config.dst, ignore)
            commit()
            push()
            log.info('Watch...')
        }, delay)
    }
}

export default new Command('sync')
    .version('0.1.0')
    .option('-w, --watch', '')
    .option('-d, --delay <minutes>', '')
    .action((options) => {
        sync(options)
    })
