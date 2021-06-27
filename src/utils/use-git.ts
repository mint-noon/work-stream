import { cd, exec, which } from 'shelljs';
import { HOSTNAME } from '../constants';
import {
    log,
    getId,
    getConfig,
} from '../utils';

const { dst }= getConfig();

export type UseGit = {
    commit: () => void;
    push: () => void;
}

export default (): UseGit => {
    if (!which('git')) {
        log.err('Git is requires!');
    }

    cd(dst);

    if (exec('git rev-parse --is-inside-work-tree').code !== 0) {
        log.err(`Shared directory must be a git repository: ${dst}`);
    }

    exec('git checkout master');
    exec('git pull --ff');

    if(exec(`git checkout ${HOSTNAME}`).code !== 0) {
        exec(`git branch ${HOSTNAME}`);
        log.warn(`Create branch for this machine with name '${HOSTNAME}'`);
    }

    exec('git merge -Xtheirs master');

    const commit = () => {
        exec(`git checkout ${HOSTNAME}`);
        exec('git add --all');
        exec(`git commit -m ${getId()}`);
    };

    const push = () => {
        exec('git checkout master');
        exec(`git merge -Xtheirs ${HOSTNAME}`);
        exec('git push');
        exec(`git checkout ${HOSTNAME}`);
    };

    return { commit, push };
};

