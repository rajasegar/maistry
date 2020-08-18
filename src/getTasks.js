'use strict';

module.exports = function() {

  const packageManifest = require(`${process.cwd()}/package.json`);

  const tasks = Object.keys(packageManifest.scripts).map((s) => {
    return { title: s, value: s };
  });

  return tasks;
};
