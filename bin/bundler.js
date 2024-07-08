#!/usr/bin/env node

const { bundleFiles } = require('../src/index');

const [,, entryFile, outputFile, ...exclusions] = process.argv;

console.log(exclusions);

if (!entryFile || !outputFile) {
  console.error('Usage: js-bundler <entryFile> <outputFile> [exclusions...]');
  process.exit(1);
}

bundleFiles(entryFile, outputFile, exclusions)
  .then(() => console.log('Bundling completed successfully.'))
  .catch(error => {
    console.error('Bundling failed:', error);
    process.exit(1);
  });
  