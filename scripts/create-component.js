const readline = require('readline');
const createComponent = require('./src/create-component');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Component Name: ', async name => {
  try {
    await createComponent(name);
  }
  catch (e) {
    console.error(e);
  }
  finally {
    rl.close();
  }
});