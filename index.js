'use strict';

var path = require('path');

var toExecutableName = require('to-executable-name');

[
  'psc',
  'psc-docs',
  'psc-make',
  'psci'
].forEach(function(binName) {
  exports[binName] = path.join(__dirname, 'vendor', toExecutableName(binName));
});
