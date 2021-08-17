// test node_modules
require('lodash/_root');
// test modules are not repeated
require('lodash/_root');
require('lodash/_root');
require('lodash/_root');

module.exports = 4;
