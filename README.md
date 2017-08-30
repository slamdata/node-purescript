# PureScript npm package

[![npm version](http://img.shields.io/npm/v/purescript.svg)](https://www.npmjs.com/package/purescript)
[![Build Status](http://img.shields.io/travis/purescript-contrib/node-purescript-bin.svg)](http://travis-ci.org/purescript-contrib/node-purescript-bin)
[![Build status](https://ci.appveyor.com/api/projects/status/bmwd6id35uw9txnv/branch/master?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/node-purescript-bin/branch/master)

[PureScript](http://www.purescript.org/) binary wrapper that makes it seamlessly available via [npm](https://www.npmjs.com/)

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install purescript
```

Note that this package makes maximum use of `postinstall` [script](https://docs.npmjs.com/misc/scripts), so please make sure that [`ignore-scripts` npm-config](https://docs.npmjs.com/misc/config#ignore-scripts) is not enabled before installation.

Once the command above is executed,

1. First, it checks if a PureScript binary has been already cached in your machine, and restores that if available.
2. The second plan: if no cache is available, it downloads a prebuilt binary from [the PureScript release page](https://github.com/purescript/purescript/releases).
3. The last resort: if a prebuilt binary is not provided for your platform or the downloaded binary doesn't work correctly, it downloads [the PureScript source code](https://github.com/purescript/purescript) and compile it with [Stack](https://docs.haskellstack.org/).

## API

### `require('purescript')`

Type: `string`

An absolute path to the installed PureScript binary, which can be used with [`child_process`](https://nodejs.org/api/child_process.html) functions.

```javascript
const {exec} = require('child_process');
const purs = require('purescript'); //=> 'Users/you/example/node_modules/purescript/purs.bin'

exec(purs, ['compile', 'input.purs', '--output', 'output.purs'], () => {
  console.log('Compiled.');
});
```

## CLI

You can use it via CLI by installing it [globally](https://docs.npmjs.com/files/folders#global-installation).

```
npm install --global purescript

purs --help
```

## License

Copyright (c) 2015 - 2017 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
