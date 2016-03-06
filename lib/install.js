'use strict';

const os = require('os');
const path = require('path');

const binBuild = require('bin-build');
const BinWrapper = require('bin-wrapper');
const eachSeries = require('async-each-series');
const log = require('logalot');
const paths = require('..');
const {BASE_URL, SOURCE_URL} = require('.');

const bin = new BinWrapper()
  .src(BASE_URL + 'macos.tar.gz', 'darwin')
  .src(BASE_URL + 'linux64.tar.gz', 'linux')
  .src(BASE_URL + 'win64.tar.gz', 'win32')
  .dest(path.dirname(paths.psc));

eachSeries(Object.keys(paths), (key, next) => {
  bin.use(path.basename(paths[key])).run(['--help'], runErr => {
    if (runErr) {
      log.warn(runErr.message);
      log.warn(key + ' pre-build test failed');
      log.info('compiling from source');

      binBuild()
        .src(SOURCE_URL)
        .cmd(`cabal sandbox init --sandbox="${path.join(bin.dest(), '.cabal-sandbox')}"`)
        .cmd('cabal update')
        .cmd(`cabal install --bindir ${bin.dest()} --jobs=${os.cpus().length}`)
        .run(buildErr => {
          if (buildErr) {
            log.error(buildErr.stack);
          } else {
            log.success(key + ' built successfully');
          }

          next();
        });

      return;
    }

    log.success(key + ' pre-build test passed successfully');
    next();
  });
});
