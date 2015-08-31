const highland = require('highland');

function isStream(obj) {
  return obj && typeof obj.pipe === 'function';
}

function isReadable(obj) {
  // highland streams is readable but it do not have `read()`, so we cannot
  // detect redability of highland streams by using it. But highland streams
  // have a `resume()` and only readable streams have it. So we can detect
  // readability of streams (including highland) by using `resume()`.
  return obj && typeof obj.resume === 'function';
}

function isWritable(obj) {
  return obj && typeof obj.write === 'function';
}

function waitUntilEndEventFired(stream, timeoutMsec) {
  let isOutdated = false;
  return new Promise((onFulfilled, onRejected) => {
    setTimeout(() => {
      if (isOutdated) {
        return;
      }
      isOutdated = true;
      onRejected(TimeoutError.create(timeoutMsec));
    }, timeoutMsec);

    highland(stream).toArray((data) => {
      if (isOutdated) {
        return;
      }
      isOutdated = true;
      onFulfilled();
    });
  });
}

class TimeoutError extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg;
  }

  static create(timeoutMsec) {
    return new TimeoutError(`Timeout of ${timeoutMsec} ms exceeded`);
  }
}

module.exports = {
  isStream,
  isReadable,
  isWritable,
  waitUntilEndEventFired,
  TimeoutError,
};
