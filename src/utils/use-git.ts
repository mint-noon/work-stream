import shell from 'shelljs'
import { HOSTNAME } from '../constants'
import {
    log,
    getId,
    getConfig,
} from '../utils'

const config = getConfig()

export type UseGit = {
    commit: () => void;
    push: () => void;
}

export default (): UseGit => {
    if (!shell.which('git')) {
        log.err('Git is requires!')
    }

    shell.cd(config.dst)

    if (shell.exec('git rev-parse --is-inside-work-tree').code !== 0) {
        log.err('bla-bla-bla')
    }

    shell.exec('git checkout master')
    shell.exec('git pull --ff')

    if(shell.exec(`git checkout ${HOSTNAME}`).code !== 0) {
        shell.exec(`git branch ${HOSTNAME}`)
        log.warn(`Create branch for this machine with name '${HOSTNAME}'`)
    }

    const commit = () => {
        shell.exec(`git checkout ${HOSTNAME}`)
        shell.exec('git add --all')
        shell.exec(`git commit -m ${getId()}`)
    }

    const push = () => {
        shell.exec('git checkout master')
        shell.exec(`git merge -Xtheirs ${HOSTNAME}`)
        shell.exec('git push')
    }

    return { commit, push }
}

