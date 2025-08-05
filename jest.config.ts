const { createDefaultPreset } = require("ts-jest");


/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest/presets/default',
  testEnvironment: "node",
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};