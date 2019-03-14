const validate = require('validate-npm-package-name');

/**
 * Determines if the given package name, along with scope,
 * is a valid NPM package name.
 * 
 * @param {string} name Package name
 * @returns {boolean} True if package name is valid
 */
const isValid = name => validate(name).validForNewPackages;
module.exports = isValid;