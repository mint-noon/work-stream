#!/usr/bin/env node

import walk from './utils/walk'
import {Command} from 'commander'
import {linkCommand} from './commands/link'
import {unlinkCommand} from './commands/unlink'

const program = new Command()

program
    .addCommand(linkCommand)
    .addCommand(unlinkCommand)

program.parse(process.argv)
