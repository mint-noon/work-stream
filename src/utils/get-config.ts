import path from 'path'
import {
    existsSync,
    readJsonSync,
    writeJsonSync,
    ensureFileSync,
} from 'fs-extra'
import {Schema, validate} from 'jsonschema'
import {warn} from '../utils/log'
import type {Config} from '../types'
import {
    HOME_DIR,
    CONFIG_FILE_PATH,
} from '../constants'

export const defaultConfig: Config = {
    src: path.join(HOME_DIR, 'Projects'),
    dst: path.join(HOME_DIR, 'WorkStream'),
    exclude: [
        '.git',
        '.gitignore',
        'node_modules',
        '.wsignore'
    ]
}

const configSchema: Schema = {
    id: '/Config',
    title: 'Config',
    type: 'object',
    properties: {
        src: {
            type: 'string',
        },
        dst: {
            type: 'string',
        },
        exclude: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
    required: ['src', 'dst', 'exclude'],
}

const getConfig = (): Config => {
    if (!existsSync(CONFIG_FILE_PATH)) {
        ensureFileSync(CONFIG_FILE_PATH)
        writeJsonSync(CONFIG_FILE_PATH, defaultConfig, {spaces: 2})
        warn(`Default config file created in: ${CONFIG_FILE_PATH}`)
    }

    const config = readJsonSync(CONFIG_FILE_PATH)

    if (validate(config, configSchema)) {
        return config
    }
    warn('Config file is wrong, use default')

    return defaultConfig
}

export default getConfig
