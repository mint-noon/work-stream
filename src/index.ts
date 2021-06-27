import { Command } from 'commander';
import {
    linkCommand,
    configCommand,
    unlinkCommand,
    syncCommand,
} from './commands';
import pkg from '../package.json';

const program = new Command();

export const main = (argv: string[]): void => {
    program
        .version(pkg.version)
        .addCommand(linkCommand)
        .addCommand(unlinkCommand)
        .addCommand(syncCommand)
        .addCommand(configCommand);

    program.parse(argv);

};
