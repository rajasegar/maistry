#!/usr/bin/env node

"use strict";

const prompts = require("prompts");
const runTasks = require("../");

const root = process.cwd();

const packageManifest = require(`${root}/package.json`);

const tasks = Object.keys(packageManifest.scripts).map((s) => {
  return { title: s, value: s };
});

const questions = [
  {
    type: "multiselect",
    name: "scripts",
    message: "Pick your tasks to run:",
    choices: tasks,
  },
];

(async () => {
  const response = await prompts(questions);
  const { scripts } = response;
  runTasks(scripts);
})();
