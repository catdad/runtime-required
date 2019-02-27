const path = require('path');
const Module = require('module');
const EventEmitter = require('events');

const resolve = require('resolve-from');

const events = new EventEmitter();

const emit = (request, id) => {
  let type = 'file';

  if (request === id) {
    type = 'builtin';
  } else if (id.indexOf(path.join('node_modules', request)) > -1) {
    type = 'module';
  }

  events.emit('file', {
    type: type,
    id: id
  });
};

// this is a hack and I don't like it
// if you know a better way to collect all required modules
// please file an issue, I'd appreciate it very much
// https://github.com/catdad/electronmon/issues/new
const originalLoad = Module._load;
Module._load = function (request, parent) {
  if (parent) {
    const idpath = resolve.silent(path.dirname(parent.filename), request);

    if (idpath) {
      emit(request, idpath);
    }
  }

  return originalLoad.apply(this, arguments);
};

module.exports = events;
