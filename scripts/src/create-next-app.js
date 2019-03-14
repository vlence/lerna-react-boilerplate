const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;

const lernaCreate = require('./common/lerna-create');
const runCommand = require('./common/run-command');
const namespace = require('./common/create-scope-namespace')('apps');
const validate = require('./common/validate-package-name');
const root = require('./common/root');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

/**
 * Gets the directory path for the app.
 * 
 * @param {string} name Name of the app
 * @returns {string}
 */
const getAppDir = name => path.resolve(root, 'apps', name);

/**
 * Installs the dependencies required by Next.js
 * in the app directory.
 * 
 * @param {string} name Name of the app
 * @returns {Promise}
 */
const install = name => {
  const cwd = getAppDir(name);
  const command = 'yarn add next react react-dom';
  const options = {cwd};

  return runCommand(command, options);
};

/**
 * Add `dev`, `build` and `start` scripts to
 * the `package.json` file of the app.
 * 
 * @param {string} name Name of the app
 * @returns {Promise}
 */
const addScripts = name => {
  const app = getAppDir(name);
  const file = `${app}/package.json`;
  const packageJson = require(file);

  packageJson.scripts = !packageJson.scripts ? {} : packageJson.scripts;
  packageJson.scripts.dev = 'next';
  packageJson.scripts.build = 'next build';
  packageJson.scripts.start = 'next start';

  const json = JSON.stringify(packageJson, null, 2);
  return writeFile(file, json);
};

/**
 * Creates the `pages` directory inside
 * the app.
 * 
 * @param {string} name Name of the app
 * @returns {Promise}
 */
const createPagesDir = name => {
  const app = getAppDir(name);
  return mkdir(`${app}/pages`);
};

/**
 * Creates the `pages/index.js` file in the
 * app directory.
 * 
 * @param {string} name Name of the app
 * @returns {Promise}
 */
const createIndexFile = name => {
  const app = getAppDir(name);
  const file = `${app}/pages/index.js`;
  const contents = [
    'const Home = () => <h1>Hello, world!</h1>;',
    'export default Home;'
  ].join('\n');

  return writeFile(file, contents);
};

/**
 * Create a Next.js app, following the offical
 * guide: https://nextjs.org/docs/
 * 
 * @param {string} name Name of the app
 * @returns {Promise}
 */
const createNextApp = async name => {
  validate(`${namespace}/${name}`);

  await lernaCreate(namespace, name, 'apps');
  await install(name);
  await addScripts(name);
  await createPagesDir(name);
  await createIndexFile(name);
};

module.exports = createNextApp;