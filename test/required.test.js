/* eslint-env mocha */
const path = require('path');

const { expect } = require('chai');
const shellton = require('shellton');

const root = path.resolve(__dirname, '..');

const run = name => {
  return new Promise((resolve, reject) => {
    shellton({
      task: `node --require ./fixtures/hook.js fixtures/${name}`,
      cwd: root
    }, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }

      return resolve({ stdout, stderr });
    });
  });
};

const resolve = relpath => {
  return path.resolve(root, relpath);
};

const files = stdout => {
  return stdout.trim().split('\n').map(s => JSON.parse(s));
};

it('finds all modules in require chain', () => {
  return run('entry1.js').then((result) => {
    expect(files(result.stdout)).to.deep.equal([
      { type: 'file', id: resolve('fixtures/files/test1.js') },
      { type: 'file', id: resolve('fixtures/files/test2.js') },
      { type: 'module', id: resolve('node_modules/resolve-from/index.js') },
      { type: 'file', id: resolve('fixtures/files/test3.js') },
      { type: 'builtin', id: 'fs' },
      { type: 'builtin', id: 'path' },
      { type: 'builtin', id: 'http' }
    ]);
    expect(result.stderr.trim()).to.equal('');
  });
});
