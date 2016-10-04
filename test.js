'use strict';

const EOL = require('os').EOL;
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const binBuild = require('bin-build');
const concatStream = require('concat-stream');
const rimraf = require('rimraf');
const test = require('tape');

const binaries = require('./package.json').bin;

const SOURCE_URL = require('./lib').SOURCE_URL;
const VERSION = '0.9.3';

test('The package entry point', t => {
  t.plan(7);

  Object.keys(binaries).forEach(binName => {
    const cp = spawn(require('.')[binName], ['--help']);
    cp.stdout.setEncoding('utf8').pipe(concatStream({encoding: 'string'}, msg => {
      t.ok(
        msg.indexOf('Usage: ' + binName) !== -1,
        `should expose a path to ${binName} binary.`
      );
    }));
  });
});

Object.keys(binaries).forEach(binName => {
  test(`"${binName}" command`, t => {
    t.plan(1);

    spawn('node', [path.resolve(binaries[binName]), '--version'])
      .stdout
      .setEncoding('utf8')
      .pipe(concatStream({encoding: 'string'}, version => {
        t.equal(version, VERSION + EOL, `should run ${binName} binary.`);
      }));
  });
});

test('Build script', t => {
  t.plan(8);

  const tmpDir = path.join(__dirname, 'tmp');

  rimraf.sync(tmpDir);
  fs.mkdirSync(tmpDir);

  binBuild()
    .src(SOURCE_URL)
    .cmd('stack setup')
    .cmd(`stack install --local-bin-path ${tmpDir}`)
    .run(runErr => {
      /* istanbul ignore if */
      if (runErr) {
        process.stderr.write(runErr.stack);
        t.fail(runErr);
        return;
      }

      fs.readdir(tmpDir, (readErr, filePaths) => {
        t.strictEqual(readErr, null, 'should create a directory.');
        Object.keys(binaries).forEach(binName => {
          t.ok(filePaths.indexOf(binName) !== -1, `should compile ${binName} binary.`);
        });
      });
    });
});
