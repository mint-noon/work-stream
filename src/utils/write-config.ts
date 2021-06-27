import {
    writeJsonSync,
} from 'fs-extra';
import type {
    ConfigWriterProps,
    ConfigWriterPropsKeys,
} from '../types';
import {
    CONFIG_FILE_PATH
} from '../constants';
import {getConfig} from '../utils';

const writeConfig = (props: ConfigWriterProps): void => {
    const config = getConfig();

    for (const [key, value] of Object.entries<string>(props)) {
        config[key as ConfigWriterPropsKeys] = value;
    }

    writeJsonSync(CONFIG_FILE_PATH, config, {spaces: 2});
};

export default writeConfig;
