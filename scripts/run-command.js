const exec = require('child_process').exec;

/**
 * Run the given command using the given
 * options, and pipe the output to stdout
 * and stderr.
 * 
 * @param {string} command Command to run
 * @param {any} options Options to pass to child_process.exec
 * 
 * @returns {Promise}
 */
const runCommand = (command, options) => new Promise((resolve, reject) => {
  const callback = (err, stdout, stderr) => {
    if (err) {
      reject(err);
    }
    else {
      resolve({stdout, stderr});
    }
  };
  
  const child = exec(command, options, callback);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
});

module.exports = runCommand;