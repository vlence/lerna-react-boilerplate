const runCommand = require('./run-command');
const rimraf = require('rimraf');
const path = require('path');

const root = path.resolve(__dirname, '..');

/**
 * Permanent remove the given directory.
 * 
 * @param {string} dir The directory to remove
 * @returns {Promise}
 */
const remove = dir => new Promise((resolve, reject) =>
  rimraf(dir, err => {
    if (err) {
      reject(err);
    }
    else {
      resolve();
    }
  }));

/**
 * Removes the `__tests__` and `lib` directories
 * that are created after running `lerna create`.
 * 
 * @param {string} name Name of the package
 * @param {string} dir Package's parent directory
 */
const removeArtifacts = (name, dir) => {
  const packageDir = path.resolve(root, dir, name);
  const tests = path.resolve(packageDir, '__tests__');
  const lib = path.resolve(packageDir, 'lib');

  return Promise.all([
    remove(tests),
    remove(lib)
  ]);
};

/**
 * Runs the `lerna create` command with defaults
 * and removes some of the artifacts.
 * 
 * @param {string} namespace Namespace of the package
 * @param {string} name Name of the package
 * @param {string} dir Name of the package's parent directory
 * 
 * @returns {Promise}
 */
const lernaCreate = (namespace, name, dir) => {
  const command = !namespace ?
    `npx lerna create ${name} ${dir} --yes`:
    `npx lerna create ${namespace}/${name} ${dir} --yes`;
  const options = {cwd: root};

  return runCommand(command, options)
    .then(() => removeArtifacts(name, dir));
};

module.exports = lernaCreate;