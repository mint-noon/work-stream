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

function gitCommands(cmds:string[]) {
    const results: string[] = [];
    for(const cmd of cmds) {
        const o = exec(cmd, SILENT);
        const m = `${cmd}\n> ${(o.stdout +'\n'+o.stderr.split('\n').join('\n> '))}`.trim()+'\n';
        results.push(m);
    }

    if(results.filter(m=> {
        for(const ignoredString of ignoredStrings)
            if(m.includes(ignoredString)) return false;
        return true;
    }).length > 0) {
        console.log(results.join('\n'));
    }
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
        gitCommands([
            `git checkout ${branch}`,
            'git pull --ff-only',
            'git add --all',
            `git commit -m ${getId()}`,
            'git push',
            'git checkout master',
            'git pull --ff-only',
            `git merge ${branch} --ff-only`,
            'git push',
            `git checkout ${branch}`,
        ]);
    };

    return { doSync };
};

