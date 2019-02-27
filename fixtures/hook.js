/* eslint-disable no-console */
const required = require('../');

required.on('file', data => {
  console.log(JSON.stringify(data));
});
