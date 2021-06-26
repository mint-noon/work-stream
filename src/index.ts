#!/usr/bin/env node

import { Command } from 'commander'
import link from './commands/link'
import unlink from './commands/unlink'
import sync from './commands/sync'

const program = new Command()

program
    .addCommand(link)
    .addCommand(unlink)
    .addCommand(sync)

program.parse(process.argv)
