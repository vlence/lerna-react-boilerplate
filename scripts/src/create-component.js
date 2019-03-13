const rimraf = require('rimraf');
const path = require('path');

const runLernaCreate = require('./common/run-lerna-create');
const runCommand = require('./common/run-command');
const root = require('./common/rooton/root');

// Identify all components by scope @example-app-components
const namespace = require('./common/create-scope-namespace')('components');

/**
 * Runs the `nwb new react-component` command in the
 * `components` directory.
 * 
 * @param {string} name Name of the component
 * @returns {Promise}
 */
const runNwbNewReactComponent = name => {
  const cwd = path.resolve(root, 'components');
  const command = `npx nwb new react-component ${name} -f --no-git`;
  const options = {cwd};

  return runCommand(command, options);
};

/**
 * Deletes the `node_modules` directory inside
 * the newly created component's directory.
 * 
 * @param {string} name Name of the component
 * @returns {Promise}
 */
const deleteNodeModules = name => {
  const component = path.resolve(root, 'components', name);
  const nodeModules = path.resolve(component, 'node_modules');

  return new Promise((resolve, reject) => {
    rimraf(nodeModules, err => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
};

/**
 * Runs `yarn install` in the newly created
 * component's directory.
 * 
 * @param {string} name Name of the component
 * @returns {Promise}
 */
const install = name => {
  const cwd = path.resolve(root, 'components', name);
  const command = 'yarn install';
  const options = {cwd};

  return runCommand(command, options);
};

/**
 * Creates a new component.
 * 
 * @param {string} name Name of the component
 * @returns {Promise}
 */
const createComponent = async name => {
  await runNwbNewReactComponent(name);
  await runLernaCreate(namespace, name, 'components');

  await deleteNodeModules(name);
  await install(name);
};

module.exports = createComponent;