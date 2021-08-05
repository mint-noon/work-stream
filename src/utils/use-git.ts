import {cd, exec, ShellString, which} from 'shelljs';
import {
    log,
    getId,
    getConfig,
} from '../utils';

const { dst, branch }= getConfig();

export type UseGit = {
    doSync: () => void;
}

const SILENT = {silent:true};
const ignoredStrings = [
    'up to date',
    'Switched to branch',
    'nothing to commit',
    'Everything up-to-date',
];

function gitPrint(o:ShellString) {
    const m = `${o.stdout} ${o.stderr}`.trim();
    if(!m.length) return;
    for(const ignoredString of ignoredStrings)
        if(m.includes(ignoredString)) return;
    console.log(m);
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
    exec('git pull --ff-only');

    if(exec(`git checkout ${branch}`).code !== 0 && exec(`git checkout origin/${branch}`).code !== 0) {
        exec(`git checkout -b ${branch}`);
        exec(`git push --set-upstream origin ${branch}`);
        exec('git pull --ff-only');
        exec('git push');
        log.warn(`Created a new branch for this machine with name: '${branch}'`);
    }

    exec('git merge master --ff-only');

    const doSync = () => {
        gitPrint(exec(`git checkout ${branch}`, SILENT));
        gitPrint(exec('git pull --ff-only', SILENT));
        gitPrint(exec('git add --all', SILENT));
        gitPrint(exec(`git commit -m ${getId()}`, SILENT));
        gitPrint(exec('git push', SILENT));
        gitPrint(exec('git checkout master', SILENT));
        gitPrint(exec('git pull --ff-only', SILENT));
        gitPrint(exec(`git merge ${branch} --ff-only`, SILENT));
        gitPrint(exec('git push', SILENT));
        gitPrint(exec(`git checkout ${branch}`, SILENT));
    };

    return { doSync };
};

