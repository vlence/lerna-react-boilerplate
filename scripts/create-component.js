const rimraf = require('rimraf').sync;
const path = require('path');
const readline = require('readline');

const runCommand = require('./run-command');

// Identify all components by scope @example-app-components
const namespace = require('./create-scope-namespace')('components');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const root = path.resolve(__dirname, '..');

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
 * Runs the `lerna create` command.
 * 
 * @param {string} name Name of the component
 * @returns {Promise}
 */
const runLernaCreate = name => {
  const command = `npx lerna create ${namespace}/${name} components --yes`;
  const options = {cwd: root};

  return runCommand(command, options);
};

/**
 * Removes the `__tests__` and `lib` directories
 * that are created after running `lerna create`.
 * 
 * @param {string} name Name of the component
 */
const removeLernaCreateArtifacts = name => {
  const component = path.resolve(root, 'components', name);
  const tests = path.resolve(component, '__tests__');
  const lib = path.resolve(component, 'lib');

  rimraf(tests);
  rimraf(lib);
};

/**
 * Deletes the `node_modules` directory inside
 * the newly created component's directory.
 * 
 * @param {string} name Name of the component
 */
const deleteNodeModules = name => {
  const component = path.resolve(root, 'components', name);
  const nodeModules = path.resolve(component, 'node_modules');

  rimraf(nodeModules);
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
  const command = `yarn install`;
  const options = {cwd};

  return runCommand(command, options);
}

rl.question('Component Name: ', async name => {
  try {
    await runNwbNewReactComponent(name);
    await runLernaCreate(name);

    removeLernaCreateArtifacts(name);
    deleteNodeModules(name);
    await install(name);
  }
  catch (e) {
    console.error(e);
  }
  finally {
    rl.close();
  }
});