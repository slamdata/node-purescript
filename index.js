'use strict';

const path = require('path');

const toExecutableName = require('to-executable-name');

for (const binName of [
  'psc',
  'psc-bundle',
  'psc-docs',
  'psc-ide-client',
  'psc-ide-server',
  'psc-package',
  'psc-publish',
  'psci'
]) {
  exports[binName] = path.join(__dirname, 'vendor', toExecutableName(binName));
}
