const fs = require('fs');
const promisify = require('util').promisify;
const path = require('path');

const access = promisify(fs.access);
const readFile = promisify(fs.readFile);

const addScopeNamespace = require('./add-scope-namespace');
const removeProjectScope = require('./remove-project-scope');
const root = require('./common/root');
const common = path.resolve(root, 'scripts', 'src', 'common');
const file = path.resolve(common, 'scope-namespace.js');

const namespace = '@test';

describe('add-scope-namespace', () => {
  it('should throw when namespace does not start with "@"', () => {
    expect(addScopeNamespace('test')).rejects.toThrow();
  });

  it('should create scope-namespace.js', () =>
    addScopeNamespace(namespace)
      .then(() => access(file)));

  it('should have correct contents', () =>
    readFile(file)
      .then(contents =>
        contents === `module.exports = '${namespace}';`));

  afterAll(removeProjectScope);
});