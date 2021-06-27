import {
    statSync,
    existsSync,
    readdirSync,
} from 'fs-extra'
import { join } from 'path'
import diff from 'lodash/difference'

import {err} from './log'
import type {Exclude} from '../types'

const walk = (src: string, exclude: Exclude, fn: (path: string) => void): void => {
    if (!existsSync(src)) {
        err(`File is not exist: ${src}`)
    }

    const validFiles = diff(readdirSync(src), exclude)

    for (const file of validFiles) {
        const absolutePath = join(src, file)
        const stat = statSync(absolutePath)

        if (stat.isDirectory()) {
            walk(absolutePath, exclude, fn)
        } else {
            fn(absolutePath)
        }
    }
}

export default walk;
