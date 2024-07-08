const fs = require('fs').promises;
const path = require('path');

const isThirdPartyModule = (modulePath) => 
  !modulePath.startsWith('.') && !path.isAbsolute(modulePath);

const findLocalRequires = (fileContent) => {
  const requireRegex = /require\(['"](.+?)['"]\)/g;
  return Array.from(fileContent.matchAll(requireRegex), m => m[1]);
};

const shouldExclude = (filePath, exclusions) => {
  const relativePath = path.relative(process.cwd(), filePath);
  return exclusions.some(pattern => {
    if (pattern.endsWith('/**')) {
      return relativePath.startsWith(pattern.slice(0, -3));
    }
    if (pattern.startsWith('**/*.')) {
      return relativePath.endsWith(pattern.slice(4));
    }
    return relativePath === pattern;
  });
};

const processFile = async (filePath, fileContents = new Map(), exclusions = []) => {
  if (fileContents.has(filePath) || shouldExclude(filePath, exclusions)) return fileContents;

  const absolutePath = path.resolve(filePath);
  try {
    const fileContent = await fs.readFile(absolutePath, 'utf-8');
    fileContents.set(filePath, fileContent);

    const requires = findLocalRequires(fileContent);
    for (const req of requires) {
      if (!isThirdPartyModule(req)) {
        try {
          const resolvedPath = require.resolve(path.resolve(path.dirname(filePath), req));
          await processFile(resolvedPath, fileContents, exclusions);
        } catch (error) {
          console.error(`Cannot resolve: ${req} in file: ${filePath}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error.message}`);
  }

  return fileContents;
};

const bundleFiles = async (entryFile, outputFile, exclusions) => {
  const fileContents = await processFile(entryFile, new Map(), exclusions);

  const bundledContent = Array.from(fileContents.entries())
    .map(([filePath, content]) => `// --- File: ${filePath} ---\n\n${content}`)
    .join('\n\n');

  await fs.writeFile(outputFile, bundledContent, 'utf-8');
  console.log(`Bundled content written to ${outputFile}`);
};

const main = async () => {
  const entryFile = './app.js';
  const outputFile = './bundled.js';
  const exclusions = [
    'node_modules/**', // Exclude all files in node_modules
    'test/**',         // Exclude all files in test directory
    '**/*.test.js',    // Exclude all test files
    'config.js',       // Exclude specific file
  ];

  try {
    await bundleFiles(entryFile, outputFile, exclusions);
  } catch (error) {
    console.error('Bundling failed:', error);
  }
};

main();

module.exports = {
    bundleFiles,
    processFile,
    shouldExclude,
    findLocalRequires,
    isThirdPartyModule
};
