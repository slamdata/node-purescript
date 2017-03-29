'use strict';

const EOL = require('os').EOL;
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const binBuild = require('bin-build');
const concatStream = require('concat-stream');
const rimraf = require('rimraf');
const test = require('tape');

const bin = require('./package.json').bin;
const SOURCE_URL = require('./lib').SOURCE_URL;
const VERSION = '0.11.1';
const allowDifferentUserFlag = ' --allow-different-user'.repeat(Number(process.platform !== 'win32'));

test('The package entry point', t => {
  t.plan(1);

  spawn(require('.'), ['--help'])
  .stdout.setEncoding('utf8').pipe(concatStream({encoding: 'string'}, msg => {
    t.ok(
      msg.indexOf('Usage: purs') !== -1,
      'should expose a path to `purs` binary.'
    );
  }));
});

test('`purs` command', t => {
  t.plan(1);

  spawn('node', [path.resolve(bin[Object.keys(bin)[0]]), '--version'])
    .stdout
    .setEncoding('utf8')
    .pipe(concatStream({encoding: 'string'}, version => {
      t.strictEqual(version, VERSION + EOL, 'should run `purs` binary.');
    }));
});

test('Build script', t => {
  t.plan(2);

  const tmpDir = path.join(__dirname, 'tmp');

  rimraf.sync(tmpDir);
  fs.mkdirSync(tmpDir);

  binBuild()
    .src(SOURCE_URL)
    .cmd(`stack setup${allowDifferentUserFlag}`)
    .cmd(`stack install${allowDifferentUserFlag} --local-bin-path ${tmpDir}`)
    .run(runErr => {
      /* istanbul ignore if */
      if (runErr) {
        process.stderr.write(runErr.stack);
        t.fail(runErr);
        return;
      }

      fs.readdir(tmpDir, (readErr, filePaths) => {
        t.strictEqual(readErr, null, 'should create a directory.');

        t.ok(filePaths.indexOf('purs') !== -1, 'should compile `purs` binary.');
      });
    });
});
