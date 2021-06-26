import shell from 'shelljs'
import { HOSTNAME } from '../constants'
import {
    log,
    getConfig,
} from '../utils'

const config = getConfig()

const useGit = () => {
    if (!shell.which('git')) {
        log.err('Git is requires!')
    }

    shell.cd(config.dst)

    if (shell.exec('git rev-parse --is-inside-work-tree').code !== 0) {
        log.err('bla-bla-bla')
    }

    if(shell.exec(`git checkout ${HOSTNAME}`).code !== 0) {
        shell.exec(`git branch ${HOSTNAME}`)
        log.warn(`Create branch for this machine with name '${HOSTNAME}'`)
    }

    shell.exec(`git status`)
}

