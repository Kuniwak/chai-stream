const {
  isStream,
  isReadable,
  isWritable,
  waitUntilEndEventFired,
  TimeoutError,
} = require('./helpers');

function extendTDDStyle(chai, utils) {
  const {assert, AssertionError} = chai;

  /*
   * Examples:
   *   - assert.isStream(obj)
   *   - assert.isNotStream(obj)
   */
  assert.isStream = function(actual) {
    assert(isStream(actual),
           `expected ${actual} to be a Stream `);
  };

  assert.isNotStream = function(actual) {
    assert(!isStream(actual),
           `expected ${actual} to not be a Stream `);
  };

  /*
   * Examples:
   *   - assert.isReadableStream(obj)
   *   - assert.isNotReadableStream(obj)
   */
  assert.isReadableStream = function(actual) {
    assert.isStream(actual);
    assert(isReadable(actual),
           `expected ${actual} to be a ReadableStream `);
  };

  assert.isNotReadableStream = function(actual) {
    assert.isStream(actual);
    assert(!isReadable(actual),
           `expected ${actual} to not be a ReadableStream `);
  };

  /*
   * Examples:
   *   - assert.isWritableStream(obj)
   *   - assert.isNotWritableStream(obj)
   */
  assert.isWritableStream = function(actual) {
    assert.isStream(actual);
    assert(isWritable(actual),
           `expected ${actual} to be a WritableStream `);
  };

  assert.isNotWritableStream = function(actual) {
    assert.isStream(actual);
    assert(!isWritable(actual),
           `expected ${actual} to not be a WritableStream `);
  };

  /*
   * Examples:
   *   - assert.streamWillEnd(stream);
   *   - assert.streamWillNotEnd(stream);
   */
  assert.streamWillEnd = function(actual) {
    return new Promise((onFulfilled) => {
      assert.isReadableStream(actual);
      onFulfilled();
    })
    .then(() => {
      return waitUntilEndEventFired(actual, 1000);
    })
    .catch((error) => {
      if (error instanceof TimeoutError) {
        throw new AssertionError('expected the stream to end but not end');
      }

      throw error;
    });
  };

  assert.streamWillNotEnd = function(actual) {
    return new Promise((onFulfilled) => {
      assert.isReadableStream(actual);
      onFulfilled();
    })
    .then(() => {
      return waitUntilEndEventFired(actual, 1000);
    })
    .then(() => {
      throw new AssertionError('expect the stream to not end but end');
    }, (error) => {
      if (error instanceof TimeoutError) {
        return;
      }

      throw error;
    });
  };
}

module.exports = extendTDDStyle;
