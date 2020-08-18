"use strict";

const runAll = require("npm-run-all");
const prompts = require("prompts");
const getTasks = require('./getTasks');

module.exports = function (options) {

  const questions = [
    {
      type: "multiselect",
      name: "scripts",
      message: "Pick your tasks to run:",
      choices: getTasks(),
    },
  ];

  (async () => {

    const response = await prompts(questions);
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
  })();

};
