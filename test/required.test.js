import path from 'path';
import test from 'ava';
import shellton from 'shellton';

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

test('finds all modules in require chain', async t => {
  const result = await run('entry1.js');

  t.deepEqual(result.stdout.trim().split('\n').map(s => s.trim()), [
    resolve('fixtures/files/test1.js'),
    resolve('fixtures/files/test2.js'),
    resolve('fixtures/files/test3.js'),
    'fs',
    'path',
    'http'
  ]);
  t.is(result.stderr.trim(), '');
});
