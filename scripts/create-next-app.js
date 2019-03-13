const readline = require('readline');
const createNextApp = require('./src/create-next-app');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('App Name: ', async name => {
  try {
    await createNextApp(name);
  }
  catch (e) {
    console.error(e);
  }
  finally {
    rl.close();
  }
});