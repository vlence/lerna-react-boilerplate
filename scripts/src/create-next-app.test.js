const createNextApp = require('./create-next-app');
const rimraf = require('rimraf');
const root = require('./common/root');
const path = require('path');

const appName = 'test';

jest.setTimeout(1000*60*2);
describe('create-next-app', () => {
  it('should create Next.js app', () => createNextApp(appName));
  
  afterAll(() => new Promise((resolve, reject) => {
    rimraf(path.resolve(root, 'apps', appName), err => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  }));
});