import {
    existsSync,
    ensureLinkSync,
} from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import {Command} from 'commander'
import walk from '../utils/walk'
import getConfig from '../utils/get-config'
import {err, info} from '../utils/log'

const config = getConfig()

const link = (src: string, dst: string, exclude: string[]): void => {
    walk(src, exclude, (path: string) => {
        ensureLinkSync(path, path.replace(src, dst))
    })
}

export const linkCommand = new Command('link')

linkCommand
    .version('0.1.0')
    .argument('[src]', '')
    .argument('[dst]', '')
    .action((src, dst) => {
        if (!src) src = config.src
        if (!dst) dst = config.dst

        try {
            if (!existsSync(src)) {
                throw new Error(`Path is not exist: ${src}`)
            }

            if (!existsSync(dst)) {
                throw new Error(`Path is not exist: ${dst}`)
            }

            link(src, dst, config.exclude)

        } catch (error) {
            err(error.message)
        }
    })

export default link
