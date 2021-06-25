import {
    existsSync,
    readFileSync,
    writeFileSync,
} from 'fs-extra'
import path from 'path'
import getConfig from './get-config'
import {warn} from './log'
import {
    IGNORE_FILE_NAME,
} from '../constants'

const config = getConfig()

const getIgnore = (): string[] => {
    const ignorePath = path.join(config.dst, IGNORE_FILE_NAME)

    let ignore = config.exclude

    if(!existsSync(ignorePath)) {
        writeFileSync(ignorePath, config.exclude.join('\n'))
        warn(`Default ignore file created at: ${ignorePath}`)
    } else {
        ignore = readFileSync(ignorePath, 'utf-8').split('\n')
    }

    return ignore
}

export default getIgnore
