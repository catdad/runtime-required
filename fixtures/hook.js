/* eslint-disable no-console */
const required = require('../');

required.on('file', path => {
  console.log(path);
});
