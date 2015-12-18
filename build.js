'use strict';

const assert = require('assert');
const fs = require('fs');

const eachAsync = require('each-async');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const {bin: binaries} = require('./package.json');

rimraf('bin/*', rmErr => {
  assert.ifError(rmErr);

  mkdirp('bin', mkdirErr => {
    assert.ifError(mkdirErr);

    eachAsync(Object.keys(binaries), (binName, index, cb) => {
      fs.writeFile(
        binaries[binName],
        `#!/usr/bin/env node\nrequire('../cli.js')('${binName}');\n`,
        cb
      );
    }, assert.ifError);
  });
});
