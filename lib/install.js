'use strict';

const path = require('path');

const binBuild = require('bin-build');
const BinWrapper = require('bin-wrapper');
const eachSeries = require('async-each-series');
const log = require('logalot');
const paths = require('..');
const urls = require('.');
const BASE_URL = urls.BASE_URL;
const SOURCE_URL = urls.SOURCE_URL;

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
        .cmd('stack setup')
        .cmd(`stack install --local-bin-path ${bin.dest()}`)
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
