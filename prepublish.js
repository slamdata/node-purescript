'use strict';

const {writeFileSync} = require('fs');
const {join} = require('path');
const values = require('lodash/fp/values');

const {bin, name} = require('./package.json');
const content = `This is a placeholder file of a PureScript binary installed with npm.
If you see this file, that means the installation was failed
and the placeholder was not replaced with a valid binary.
Try installing \`${name}\` npm package again.
`;

writeFileSync(join(__dirname, values(bin)[0]), content, {mode: '755'});
