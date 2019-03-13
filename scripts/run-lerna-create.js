const runCommand = require('./run-command');
const path = require('path');

const root = path.resolve(__dirname, '..');

/**
 * Runs the `lerna create` command with defaults.
 * 
 * @param {string} name Name of the package
 * @param {string} dir Name of the package's parent directory
 * 
 * @returns {Promise}
 */
const runLernaCreate = (name, dir) => {
  const command = `npx lerna create ${name} ${dir} --yes`;
  const options = {cwd: root};

  return runCommand(command, options);
};

module.exports = runLernaCreate;