# PureScript wrapper for [Node](https://nodejs.org/)

[![NPM version](http://img.shields.io/npm/v/purescript.svg)](https://www.npmjs.com/package/purescript)
[![Build Status](http://img.shields.io/travis/purescript-contrib/node-purescript-bin.svg)](http://travis-ci.org/purescript-contrib/node-purescript-bin)
[![Coverage Status](https://img.shields.io/coveralls/purescript-contrib/node-purescript-bin.svg)](https://coveralls.io/r/purescript-contrib/node-purescript-bin)
[![Dependency Status](https://img.shields.io/david/purescript-contrib/node-purescript-bin.svg)](https://david-dm.org/purescript-contrib/node-purescript-bin)
[![devDependency Status](https://img.shields.io/david/dev/purescript-contrib/node-purescript-bin.svg)](https://david-dm.org/purescript-contrib/node-purescript-bin#info=devDependencies)

[PureScript](http://www.purescript.org/) binary wrapper that makes it seamlessly available via [npm](https://www.npmjs.com/)

## Installation

[Use npm](https://docs.npmjs.com/cli/install).

```sh
npm install purescript
```

## Usage

```javascript
var execFile = require('child_process').execFile;
var paths = require('purescript');

// On POSIX
paths.psc; //=> '/path/to/proj/node_modules/purescript/vendor/psc'
paths['psc-docs']; //=> '/path/to/proj/node_modules/purescript/vendor/psc-docs'
paths['psc-make']; //=> '/path/to/proj/node_modules/purescript/vendor/psc-make'
paths.psci; //=> '/path/to/proj/node_modules/purescript/vendor/psci'

execFile(psc, ['input.purs', '--output', 'output.purs'], function(err) {
  if (err) {
    throw err;
  }

  console.log('Compiled.');
});
```

## API

### require('purescript').psc

Type: `String`

The path to [`psc`](https://github.com/purescript/purescript/wiki/Language-Guide:-Getting-Started#compiler-usage) binary

### require('purescript')['psc-docs']

Type: `String`

The path to `psc-docs` binary

### require('purescript')['psc-make']

Type: `String`

The path to [`psc-make`](https://github.com/purescript/purescript/wiki/Language-Guide:-Getting-Started#psc-make) binary

### require('purescript').psci

Type: `String`

The path to `psci` binary

## CLI

You can use it via CLI by installing it [globally](https://docs.npmjs.com/files/folders#global-installation). 

```sh
npm install -g purescript

psc --help
psc-docs --help
psc-make --help
psci --help
```

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
