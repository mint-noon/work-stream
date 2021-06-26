import chalk from 'chalk'

export const err = (...text: unknown[]) => {
    process.stderr.write(chalk.stderr.red.bgWhite('ERROR:'))
    process.stderr.write(chalk.stderr.red(' ', ...text, '\n'))
}

export const info =(...text: unknown[]) => {
    process.stdout.write(chalk.blue(...text, '\n'))
}

export const success = (...text: unknown[]) => {
    process.stdout.write(chalk.green(...text, '\n'))
}

export const warn = (...text: unknown[]) => {
    process.stdout.write(chalk.yellow(...text, '\n'))
}
