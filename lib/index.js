'use strict';

var VERSION = require('../package.json')['purescript-version'];

exports.VERSION = VERSION;
exports.SOURCE_URL = 'https://github.com/purescript/purescript/archive/v' + VERSION + '.tar.gz';
