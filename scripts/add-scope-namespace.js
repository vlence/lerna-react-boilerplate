const readline = require('readline');
const addScopeNamespace = require('./src/add-scope-namespace');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getNamespace = () => {
  if (process.argv[2]) {
    return Promise.resolve(process.argv[2]);
  }
  else {
    return new Promise(resolve => {
      rl.question('Scope Namespace: ', resolve);
    });
  }
};

getNamespace()
  .then(addScopeNamespace)
  .catch(console.error)
  .then(() => rl.close());