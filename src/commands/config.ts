import { Command } from 'commander';
import {
    log,
    getConfig,
    writeConfig,
} from '../utils';

export default new Command('config')
    .description('Call without flags to see your config file')
    .option('-s, --src <target>', 'Absolute path to source directory')
    .option('-d, --dst <target>', 'Absolute path to destination directory')
    .option('-b, --branch <name>', 'Name for this machine working branch')
    .action((options) => {
        writeConfig(options);
        log.success(JSON.stringify(getConfig(), null, 2));
    });
