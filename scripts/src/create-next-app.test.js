const promisify = require('util').promisify;
const rimraf = promisify(require('rimraf'));

const root = require('./common/root');
const path = require('path');

const addScopeNamespace = require('./add-scope-namespace');
const removeProjectScope = require('./remove-project-scope');

const appName = 'test';

beforeAll(() => addScopeNamespace('@test'));
afterAll(removeProjectScope);

jest.setTimeout(1000*60*2);
describe('create-next-app', () => {
  
  let createNextApp;
  beforeAll(() => createNextApp = require('./create-next-app'));
  afterAll(() => rimraf(path.resolve(root, 'apps', appName)));

  it('should fail with invalid name', () => {
    expect(createNextApp('invalid!')).rejects.toThrow();
  });

  it('should create Next.js app', () => createNextApp(appName));
});