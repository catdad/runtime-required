const fs = require('fs');
const path = require('path');
const http = require('http');

const fullpath = path.resolve(__dirname, 'test4.js');

require(fullpath);

module.exports = 3;
