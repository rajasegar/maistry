"use strict";

const runAll = require("npm-run-all");

module.exports = function (scripts) {
  runAll(scripts, {
    parallel: false,
    stdout: process.stdout,
  })
    .then(() => {
      console.log("done!");
    })
    .catch((err) => {
      console.log("failed!");
    });
};
