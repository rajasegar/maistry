'use strict';
const fs = require('fs');
const prompts = require("prompts");
const sortPackageJson = require('sort-package-json');
const getTasks = require('./getTasks');

function stringify(contents) {
  return `${JSON.stringify(contents, null, 2)}\n`;
};

module.exports = function() {

  const createPrompt = [
    {
      type: "multiselect",
      name: "tasks",
      message: "Pick your tasks to create/combine:",
      choices: getTasks()
    },
    {
      type: 'text',
      name: 'name',
      message: 'Enter a name for the new task:'
    }
  ];

  (async () => {
    const response = await prompts(createPrompt);
    const { tasks, name } = response;

    console.log('Combining tasks ', tasks.join(','));
    const newTask = tasks.map(t => `npm run ${t}`).join(' && ');
    console.log(`${name}: ${newTask}`);
    const filePath = `${process.cwd()}/package.json`;
    const packageManifest = require(filePath);
    packageManifest.scripts[name] = newTask;

    const data = stringify(sortPackageJson(packageManifest));

    fs.writeFile(filePath, data, () => {
      console.log('package.json updated succesfully.');
    });

  })();



}
