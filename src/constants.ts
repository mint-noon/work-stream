import { homedir, hostname } from 'os';
import { join } from 'path';

export const HOME_DIR = homedir();
export const HOSTNAME = hostname();
export const CONFIG_FILE_PATH = join(HOME_DIR, '.config/wost/config.json');
export const IGNORE_FILE_NAME = '.wsignore';
