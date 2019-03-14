const path = require('path');
const promisify = require('util').promisify;
const writeFile = promisify(require('fs').writeFile);

const root = require('./common/root');

/**
 * Saves the given namespace to a file,
 * if it is valid.
 * 
 * @param {string} namespace The namespace
 * @returns {Promise} Resolves when successfully saved
 */
const addScopeNamespace = async namespace => {
  if (!namespace.startsWith('@')) {
    return Promise.reject(SyntaxError('Scope must start with "@"'));
  }

  const common = path.resolve(root, 'scripts', 'src', 'common');
  const file = path.resolve(common, 'scope-namespace.js');
  const contents = `module.exports = '${namespace}';`;

  return writeFile(file, contents);
};

module.exports = addScopeNamespace;