import chalk from 'chalk';

export const err = (...text: unknown[]): void => {
    process.stderr.write(chalk.stderr.red.bgWhite('ERROR:'));
    process.stderr.write(chalk.stderr.red(' ', ...text, '\n'));
};

export const info =(...text: unknown[]): void => {
    process.stderr.write(chalk.stderr.blue.bgWhite('INFO:'));
    process.stdout.write(chalk.blue(' ', ...text, '\n'));
};

export const success = (...text: unknown[]): void => {
    process.stderr.write(chalk.stderr.black.bgGreen('OK:'));
    process.stdout.write(chalk.green(' ', ...text, '\n'));
};

export const warn = (...text: unknown[]): void => {
    process.stderr.write(chalk.stderr.yellow.bgBlue('WARN:'));
    process.stdout.write(chalk.yellow(' ', ...text, '\n'));
};
