'use strict';

var path = require('path');

var suffix;
if (process.platform === 'win32') {
  suffix = '.exe';
} else {
  suffix = '';
}

[
  'psc',
  'psc-docs',
  'psc-make',
  'psci'
].forEach(function(binName) {
  exports[binName] = path.join(__dirname, 'vendor', binName + suffix);
});
