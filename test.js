'use strict';

var fs = require('fs');
var path = require('path');

var binBuild = require('bin-build');
var EOL = require('os').EOL;
var rimraf = require('rimraf');
var spawn = require('child_process').spawn;
var test = require('tape');

var pkg = require('./package.json');

var SOURCE_URL = require('./lib').SOURCE_URL;
var VERSION = require('./lib').VERSION;

test('The package entry point', function(t) {
  t.plan(4);

  var pscStdout = '';

  spawn(require('./').psc)
    .on('close', function() {
      t.ok(/__superclass_Prelude/.test(pscStdout), 'should expose a path to psc binary.');
    })
    .stdout
      .on('data', function(data) {
        pscStdout += data;
      })
      .setEncoding('utf8');

  var pscDocsStdout = '';

  spawn(require('./')['psc-docs'], ['--help'])
    .on('close', function() {
      t.ok(/Usage: psc-docs/.test(pscDocsStdout), 'should expose a path to psc-docs binary.');
    })
    .stdout
      .on('data', function(data) {
        pscDocsStdout += data;
      })
      .setEncoding('utf8');

  var pscMakeStdout = '';

  spawn(require('./')['psc-make'], ['--help'])
    .on('close', function() {
      t.ok(/Usage: psc-make/.test(pscMakeStdout), 'should expose a path to psc-make binary.');
    })
    .stdout
      .on('data', function(data) {
        pscMakeStdout += data;
      })
      .setEncoding('utf8');

  var psciStdout = '';

  spawn(require('./').psci, ['--help'])
    .on('close', function() {
      t.ok(/Usage: psci/.test(psciStdout), 'should expose a path to psci binary.');
    })
    .stdout
      .on('data', function(data) {
        psciStdout += data;
      })
      .setEncoding('utf8');
});

[
  'psc',
  'psc-docs',
  'psc-make',
  'psci'
].forEach(function(binName) {
  test('"' + binName + '" command', function(t) {
    t.plan(1);

    spawn('node', [path.resolve(pkg.bin[binName]), '--version'])
      .stdout
        .on('data', function(version) {
          t.equal(version, VERSION + EOL, 'should run ' + binName + ' binary.');
        })
        .setEncoding('utf8');
  });
});

test('Build script', function(t) {
  t.plan(5);

  var tmpDir = path.join(__dirname, 'tmp');

  rimraf.sync(tmpDir);

  binBuild()
    .src(SOURCE_URL)
    .cmd('cabal update')
    .cmd('cabal install --bindir ' + tmpDir)
    .run(function(runErr) {
      /* istanbul ignore if */
      if (runErr) {
        process.stderr.write(runErr.message);
        t.fail(runErr);
        return;
      }

      fs.readdir(tmpDir, function(readErr, filePaths) {
        t.strictEqual(readErr, null, 'should create a directory.');
        t.notEqual(filePaths.indexOf('psc'), -1, 'should compile psc binary.');
        t.notEqual(filePaths.indexOf('psc-docs'), -1, 'should compile psc-docs binary.');
        t.notEqual(filePaths.indexOf('psc-make'), -1, 'should compile psc-make binary.');
        t.notEqual(filePaths.indexOf('psci'), -1, 'should compile psci binary.');
      });
    });
});
