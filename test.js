'use strong';

const {EOL} = require('os');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {spawn} = require('child_process');

const binBuild = require('bin-build');
const concatStream = require('concat-stream');
const rimraf = require('rimraf');
const test = require('tape');

const {bin: binaries} = require('./package.json');

const {SOURCE_URL} = require('./lib');
const VERSION = '0.8.2.0';

test('The package entry point', t => {
  t.plan(7);

  Object.keys(binaries).forEach(binName => {
    const cp = spawn(require('.')[binName], ['--help']);
    cp.stdout.setEncoding('utf8').pipe(concatStream({encoding: 'string'}, msg => {
      t.ok(
        msg.includes('Usage: ' + binName),
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

  binBuild()
    .src(SOURCE_URL)
    .cmd(`cabal sandbox init --sandbox="${path.join(tmpDir, '.cabal-sandbox')}"`)
    .cmd('cabal update')
    .cmd(`cabal install --bindir ${tmpDir} --jobs=${os.cpus().length}`)
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
          t.ok(filePaths.includes(binName), `should compile ${binName} binary.`);
        });
      });
    });
});
