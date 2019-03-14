const readline = require('readline');
const createNextApp = require('./src/create-next-app');

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
      rl.question('App Name: ', resolve);
    });
  }
};

getName()
  .then(createNextApp)
  .catch(console.error)
  .then(() => rl.close());