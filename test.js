'use strict';

const {resolve} = require('path');

const execa = require('execa');
const lstat = require('lstat');
const purescript = require('.');
const semverRegex = require('semver-regex');
const test = require('tape');

const {bin, scripts} = require('./package.json');

test('`bin` field of package.json', t => {
  t.deepEqual(
    Object.keys(bin),
    ['purs'],
    'should only include a single path.'
  );

  t.end();
});

test('Node.js API', t => {
  t.equal(
    typeof purescript,
    'string',
    'should expose a string.'
  );

  t.equal(
    purescript,
    resolve(bin.purs),
    'should be equal to the binary path.'
  );

  t.end();
});

test('`prepublishOnly` script', async t => {
  await execa('npm', ['run', 'prepublishOnly']);
  const stat = await lstat(purescript);

  t.ok(
    stat.isFile(),
    'should create a placeholder file.'
  );

  t.ok(
    stat.size < 250,
    'should create a sufficiently small file.'
  );

  t.end();
});

test('`postinstall` script', async t => {
  await execa('npm', ['run', 'postinstall']);

  t.equal(
    (await execa(purescript, ['--version'])).stdout,
    scripts.postinstall.match(semverRegex())[0],
    'should install a PureScript binary.'
  );

  t.end();
});
