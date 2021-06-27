import { Command } from 'commander'
import link from './commands/link'
import unlink from './commands/unlink'
import sync from './commands/sync'
import pkg from '../package.json'

const program = new Command()

program
    .version(pkg.version)
    .addCommand(link)
    .addCommand(unlink)
    .addCommand(sync)

program.parse(process.argv)
