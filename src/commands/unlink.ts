import {
    removeSync,
    readdirSync,
} from 'fs-extra'
import path from 'path'
import {Command} from 'commander'
import getConfig from '../utils/get-config'
import {err} from '../utils/log'

const config = getConfig()

const unlink = (target: string) => {
    const files = readdirSync(target)

    for (const file of files){
        const absolutePath = path.join(target, file)
        removeSync(absolutePath)
    }
}

export const unlinkCommand = new Command('unlink')

unlinkCommand
    .version('0.1.0')
    .action(() => {
        try {
            unlink(config.dst)
        } catch (error) {
            err(error.message)
        }
    })

export default unlink
