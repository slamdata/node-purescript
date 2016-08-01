'use strict';

const spawn = require('child_process').spawn;

module.exports = binName => {
  const child = spawn(require('./')[binName], process.argv.slice(2), {stdio: 'inherit'});
  child.on('exit', process.exit);
  process.on('SIGINT', () => {
    child.kill('SIGINT');
  });
  process.on('SIGTERM', () => {
    child.kill();
  });
};
