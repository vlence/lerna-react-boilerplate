const namespace = require('./scope-namespace');

/**
 * Returns a namespace string, prefixed with
 * `@example-app`.
 * 
 * @param {string} name The namespace
 * @returns {string}
 */
const createScopeNamespace = name => `${namespace}-${name}`;
module.exports = createScopeNamespace;