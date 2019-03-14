const fs = require('fs');
const path = require('path');
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

  return new Promise((resolve, reject) => {
    fs.writeFile(file, contents, err => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
};

module.exports = addScopeNamespace;