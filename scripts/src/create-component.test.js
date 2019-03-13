const createComponent = require('./create-component');
const rimraf = require('rimraf');
const root = require('./root');
const path = require('path');

const componentName = 'test';

jest.setTimeout(1000*60*2);
describe('create-component', () => {
  it('should create component', () => createComponent(componentName));
  
  afterAll(() => new Promise((resolve, reject) => {
    rimraf(path.resolve(root, 'components', componentName), err => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  }));
});