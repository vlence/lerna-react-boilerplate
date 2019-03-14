const isValid = require('./is-valid-package-name');

/**
 * Validates the given package name.
 * 
 * @param {string} packageName Package name, including scope
 * @throws SyntaxError error if package name is invalid
 */
const validate = packageName => {
  if (!isValid(packageName)) {
    throw new SyntaxError(`"${packageName}" is not a valid name`);
  }
};

module.exports = validate;