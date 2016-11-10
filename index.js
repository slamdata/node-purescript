'use strict';

const path = require('path');

const toExecutableName = require('to-executable-name');

[
  'psc',
  'psc-bundle',
  'psc-docs',
  'psc-ide-client',
  'psc-ide-server',
  'psc-package',
  'psc-publish',
  'psci'
].forEach(binName => {
  exports[binName] = path.join(__dirname, 'vendor', toExecutableName(binName));
});
