'use strict';

var _require = require('./helpers'),
    isStream = _require.isStream,
    isReadable = _require.isReadable,
    isWritable = _require.isWritable,
    waitUntilEndEventFired = _require.waitUntilEndEventFired,
    TimeoutError = _require.TimeoutError;

function extendExpectStyle(chai, utils) {
  var Assertion = chai.Assertion,
      AssertionError = chai.AssertionError;

  /*
   * Examples:
   *   - expect(obj).to.be.a.Stream
   *   - expect(obj).to.not.be.a.Stream
   */

  utils.addProperty(Assertion.prototype, 'Stream', function () {
    var actual = this._obj;
    this.assert(isStream(actual), 'expect #{this} to be a Stream', 'expect #{this} to not be a Stream');
  });

  /*
   * Examples:
   *   - expect(obj).to.be.a.ReadableStream
   *   - expect(obj).to.not.be.a.ReadableStream
   */
  utils.addProperty(Assertion.prototype, 'ReadableStream', function () {
    var actual = this._obj;

    new Assertion(this._obj).to.be.a.Stream;

    this.assert(isReadable(actual), 'expect #{this} to be a readable stream but got not readable', 'expect #{this} to not be a readable stream but got readable');
  });

  /*
   * Examples:
   *   - expect(obj).to.be.a.WritableStream
   *   - expect(obj).to.not.be.a.WritableStream
   */
  utils.addProperty(Assertion.prototype, 'WritableStream', function () {
    var actual = this._obj;

    new Assertion(this._obj).to.be.a.Stream;

    this.assert(isWritable(actual), 'expect #{this} to be a writable stream but got not writable', 'expect #{this} to not be a writable stream but got writable');
  });

  /*
   * Examples:
   *   - expect(obj).to.be.a.WritableStream
   *   - expect(obj).to.not.be.a.WritableStream
   */
  utils.addProperty(Assertion.prototype, 'end', function () {
    var _this = this;

    var actual = this._obj;

    return new Promise(function (onFulfilled) {
      new Assertion(actual).to.be.a.ReadableStream;
      onFulfilled();
    }).then(function () {
      return waitUntilEndEventFired(actual, 1000);
    }).then(function () {
      // For supporting .to.not.end
      _this.assert(true, 'expected the stream to not end but end');
      return actual;
    }, function (error) {
      if (error instanceof TimeoutError) {
        // For supporting .to.not.end
        _this.assert(false, 'expected the stream to end but not end');
        return;
      }

      throw error;
    });
  });
}

module.exports = extendExpectStyle;