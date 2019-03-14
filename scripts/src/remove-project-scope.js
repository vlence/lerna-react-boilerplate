const promisify = require('util').promisify;
const path = require('path');

const unlink = promisify(require('fs').unlink);

const root = require('./common/root');
const common = path.resolve(root, 'scripts', 'src', 'common');
const file = path.resolve(common, 'scope-namespace.js');

module.exports = unlink.bind(null, file);