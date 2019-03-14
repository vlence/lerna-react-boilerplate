const path = require('path');
const promisify = require('util').promisify;
const rimraf = promisify(require('rimraf'));

const root = require('./common/root');
const addScopeNamespace = require('./add-scope-namespace');
const removeProjectScope = require('./remove-project-scope');

const componentName = 'test';

beforeAll(() => addScopeNamespace('@test'));
afterAll(() => removeProjectScope());

jest.setTimeout(1000*60*2);
describe('create-component', () => {
  
  // We do this because create-component.js requires
  // a non-existent file. The file is only created
  // after we run beforeAll().
  let createComponent;
  beforeAll(() => createComponent = require('./create-component'));

  afterAll(() => rimraf(path.resolve(root, 'components', componentName)));

  it('should fail if package name is invalid', () => {
    expect(createComponent('invalid!')).rejects.toThrow();
  });

  it('should create component', () => createComponent(componentName));
});