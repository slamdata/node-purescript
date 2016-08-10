# [PureScript](https://github.com/purescript/purescript) wrapper for [Node](https://nodejs.org/)

[![NPM version](http://img.shields.io/npm/v/purescript.svg)](https://www.npmjs.com/package/purescript)
[![Build Status](http://img.shields.io/travis/purescript-contrib/node-purescript-bin.svg)](http://travis-ci.org/purescript-contrib/node-purescript-bin)
[![Coverage Status](https://img.shields.io/coveralls/purescript-contrib/node-purescript-bin.svg)](https://coveralls.io/github/purescript-contrib/node-purescript-bin?branch=master)
[![dependencies Status](https://david-dm.org/purescript-contrib/node-purescript-bin/status.svg)](https://david-dm.org/purescript-contrib/node-purescript-bin)
[![devDependencies Status](https://david-dm.org/purescript-contrib/node-purescript-bin/dev-status.svg)](https://david-dm.org/purescript-contrib/node-purescript-bin?type=dev)

[PureScript](http://www.purescript.org/) binary wrapper that makes it seamlessly available via [npm](https://www.npmjs.com/)

## Installation

[Use npm](https://docs.npmjs.com/cli/install) after making sure your development environment satisfies [the requirements](https://github.com/purescript/purescript/blob/3fa95cc6e4e814d71d52e24062d6e9ecef3c16d3/INSTALL.md#the-curses-library).

```
npm install purescript
```

### Release candidate version

Specify `next` [tag](https://docs.npmjs.com/cli/dist-tag#purpose) on installation.

```
npm install purescript@next
```

## Usage

```javascript
const {execFile} = require('child_process');
const paths = require('purescript');

// On POSIX
paths.psc; //=> '/path/to/proj/node_modules/purescript/vendor/psc'
paths['psc-bundle']; //=> '/path/to/proj/node_modules/purescript/vendor/psc-bundle'
paths['psc-docs']; //=> '/path/to/proj/node_modules/purescript/vendor/psc-docs'
paths['psc-ide-client']; //=> '/path/to/proj/node_modules/purescript/vendor/psc-ide-client'
paths['psc-ide-server']; //=> '/path/to/proj/node_modules/purescript/vendor/psc-ide-server'
paths['psc-publish']; //=> '/path/to/proj/node_modules/purescript/vendor/psc-publish'
paths.psci; //=> '/path/to/proj/node_modules/purescript/vendor/psci'

execFile(paths.psc, ['input.purs', '--output', 'output.purs'], err => {
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

### require('purescript')['psc-bundle']

Type: `String`

The path to [`psc-bundle`](https://github.com/purescript/purescript/blob/master/psc-bundle/README.md) binary

### require('purescript')['psc-docs']

Type: `String`

The path to `psc-docs` binary

### require('purescript')['psc-ide-client']

Type: `String`

The path to [`psc-ide-client`](https://github.com/purescript/purescript/tree/master/psc-ide-server#issuing-queries) binary

### require('purescript')['psc-ide-server']

Type: `String`

The path to [`psc-ide-server`](https://github.com/purescript/purescript/tree/master/psc-ide-server#running-the-server) binary

### require('purescript')['psc-publish']

Type: `String`

The path to `psc-publish` binary

### require('purescript').psci

Type: `String`

The path to [`psci`](https://github.com/purescript/purescript/wiki/PSCi) binary

## CLI

You can use it via CLI by installing it [globally](https://docs.npmjs.com/files/folders#global-installation). 

```
npm install -g purescript

psc --help
psc-bundle --help
psc-docs --help
psc-ide-client --help
psc-ide-server --help
psc-publish --help
psci --help
```

## License

Copyright (c) 2015 - 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
