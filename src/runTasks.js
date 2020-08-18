"use strict";

const runAll = require("npm-run-all");
const { MultiSelect } = require('enquirer');
const getTasks = require('./getTasks');

module.exports = function (options) {

  const prompt = new MultiSelect({
      name: "scripts",
      message: "Pick your tasks to run:",
      choices: getTasks(),
    });


    prompt.run()
    .then(response => {
    const { scripts } = response;

    runAll(scripts, {
      parallel: options.parallel || false,
      stdout: options.stdout || process.stdout,
      aggregateOutput: options.parallel || false
    })
      .then(() => {
        console.log("done!");
      })
      .catch((err) => {
        console.log("failed!");
      });
    })
    .catch(console.error);

};
