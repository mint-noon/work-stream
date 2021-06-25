import chalk from 'chalk'

export const err = (...text: unknown[]) => {
    chalk.stderr.red.bgWhite('ERROR: ')
    chalk.stderr.red(...text)
}

export const info =(...text: unknown[]) => {
    process.stdout.write(chalk.blue(...text))
}

export const success = (...text: unknown[]) => {
    process.stdout.write(chalk.green(...text))
}

export const warn = (...text: unknown[]) => {
    process.stdout.write(chalk.yellow(...text))
}
