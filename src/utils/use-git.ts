import { cd, exec, which } from 'shelljs';
import {
    log,
    getId,
    getConfig,
} from '../utils';

const { dst, branch }= getConfig();

export type UseGit = {
    doSync: () => void;
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

    if(exec(`git checkout ${branch}`).code !== 0) {
        exec(`git branch ${branch}`);
        log.warn(`Create branch for this machine with name '${branch}'`);
    }

    exec('git merge -Xtheirs master');

    const doSync = () => {
        exec(`git checkout ${branch}`);
        exec('git add --all');
        exec(`git commit -m ${getId()}`);
        exec('git push');
        exec('git checkout master');
        exec(`git merge -Xtheirs ${branch}`);
        exec('git push');
        exec(`git checkout ${branch}`);
    };

    return { doSync };
};

