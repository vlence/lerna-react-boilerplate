const readline = require('readline');
const createComponent = require('./src/create-component');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getName = () => {
  if (process.argv[2]) {
    return Promise.resolve(process.argv[2]);
  }
  else {
    return new Promise(resolve => {
      rl.question('Component Name: ', resolve);
    });
  }
};

getName()
  .then(createComponent)
  .catch(console.error)
  .then(() => rl.close());