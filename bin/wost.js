#!/usr/bin/env node

require = require('esm')(module)
require('../lib/src/index').main(process.argv)
