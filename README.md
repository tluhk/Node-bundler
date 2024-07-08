# JavaScript File Bundler

## Overview

This project is a simple JavaScript file bundler that combines multiple JavaScript files into a single file. It follows `require` statements to include all necessary local dependencies, while excluding specified files and directories. The purpose of this project is to provide an opportunity to analyze your Node.js project with the help of AI, for example to find possible development areas or for the purpose of creating documentation.

## Features

- Bundles JavaScript files starting from an entry point
- Follows local `require` statements recursively
- Excludes specified files and directories
- Handles circular dependencies
- Distinguishes between local and third-party modules
- Asynchronous file processing for better performance
- Command-line interface (CLI) for easy usage

## Installation

To use the JS File Bundler as a command-line tool, you can install it globally:

```bash
npm install -g js-file-bundler
```

For local development or to use it as a module in your project:

```bash
npm install js-file-bundler
```

## Usage

### Command Line Interface (CLI)

After installing the package globally, you can use the bundler from the command line:

```bash
js-bundler <entryFile> <outputFile> [exclusions...]
```

Arguments:

- `<entryFile>`: Path to the main JavaScript file (entry point)
- `<outputFile>`: Path where the bundled file will be saved
- `[exclusions...]`: (Optional) Space-separated list of files or patterns to exclude

Example:

```bash
js-bundler ./src/app.js ./dist/bundle.js node_modules/** test/** **/*.test.js
```

This command will bundle `./src/app.js` and its dependencies into `./dist/bundle.js`, excluding everything in `node_modules`, `test` directories, and all files ending with `.test.js`.

### Exclusion Patterns

The CLI supports three types of exclusion patterns:

1. `directory/**`: Excludes all files in the specified directory and its subdirectories.
2. `**/*.extension`: Excludes all files with the specified extension in any directory.
3. `filename.js`: Excludes a specific file.

### Programmatic Usage

You can also use the bundler in your Node.js scripts:

```javascript
const { bundleFiles } = require('js-file-bundler');

const entryFile = './src/app.js';
const outputFile = './dist/bundle.js';
const exclusions = ['node_modules/**', 'test/**', '**/*.test.js'];

bundleFiles(entryFile, outputFile, exclusions)
  .then(() => console.log('Bundling completed successfully.'))
  .catch(error => console.error('Bundling failed:', error));
```

## API Reference

### bundleFiles(entryFile, outputFile, exclusions)

Bundles JavaScript files starting from the entry point.

- `entryFile` (string): Path to the main JavaScript file.
- `outputFile` (string): Path where the bundled file will be saved.
- `exclusions` (array): Array of strings representing exclusion patterns.

Returns a Promise that resolves when bundling is complete.

### processFile(filePath, fileContents, exclusions)

Processes a single file and its dependencies.

- `filePath` (string): Path to the file to process.
- `fileContents` (Map): Map to store processed file contents.
- `exclusions` (array): Array of exclusion patterns.

Returns a Promise that resolves with the updated `fileContents` Map.

### shouldExclude(filePath, exclusions)

Checks if a file should be excluded based on the exclusion patterns.

- `filePath` (string): Path of the file to check.
- `exclusions` (array): Array of exclusion patterns.

Returns `true` if the file should be excluded, `false` otherwise.

### findLocalRequires(fileContent)

Extracts local `require` statements from a file's content.

- `fileContent` (string): Content of the JavaScript file.

Returns an array of local module paths.

### isThirdPartyModule(modulePath)

Determines if a required module is a third-party module.

- `modulePath` (string): Path of the module as it appears in `require` statement.

Returns `true` for third-party modules, `false` for local modules.
