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
    let hasErrorOutputs = false;
    for(const cmd of cmds) {
        const o = exec(cmd, SILENT);
        const o2 = `${o.stdout}\n${o.stderr}`.trim();

        let errorOutput = !!o2.length;
        if(o2.length) {
            for(const ignoredString of ignoredStrings)
                if(o2.includes(ignoredString)) {
                    errorOutput = false;
                    break;
                }
        }

        hasErrorOutputs = hasErrorOutputs || errorOutput;

        const errStr = errorOutput ? 'ERR' : 'OK ';
        const m = `${cmd}\n${errStr} ${o2.split('\n').join(`\n${errStr} `)}`.trim()+'\n';
        results.push(m);
    }

    if(hasErrorOutputs) {
        console.log('================== START ======================');
        console.log(results.join('\n'));
        console.log('=================== END =======================\n');
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
        // TODO Тут нужно реализовать такую логику:
        //  1. Коммит и пуш локальных изменений в свою ветку - в любом случае
        gitCommands([
            `git checkout ${branch}`,
            'git pull -Xtheirs',
            'git add --all',
            `git commit -m "${(new Date()).toISOString()} ${branch}"`,
            'git push',
            'git checkout master',
            'git pull -Xtheirs',
            `git merge ${branch} --ff-only`,
            //            `git commit -m "${(new Date()).toISOString()} merged from ${branch}"`,
            'git push',
            `git checkout ${branch}`,
            'git merge master -Xtheirs',
            `git commit -m "${(new Date()).toISOString()} merged from master"`,
            'git push',
        ]);
    };

    return { doSync };
};

