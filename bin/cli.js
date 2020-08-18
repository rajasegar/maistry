#!/usr/bin/env node

"use strict";

const { createTasks, runTasks } = require("../");

function main(options) {

  try {
    const root = process.cwd();
    const packageManifest = require(`${root}/package.json`);

    if(options.create) {
      createTasks();
    } else {
      runTasks(options);
    }
  } catch(err) {
    console.log(err);
  }
}

const argv = require('yargs')
  .usage('Usage: maistry [options]')
  .command('$0', 'maistry', () => {}, (argv) => {
    main(argv);
  })
  .option('stdout',{
    describe: 'Specify stdout for output'
  })
  .option('parallel', {
    alias: 'p',
    describe: 'Run tasks in parallel',
    default: false
  })
  .option('create', {
    alias: 'c',
    describe: 'Create / Combine new tasks from existing ones'
  })
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .epilog('Copyright 2020')
  .argv


