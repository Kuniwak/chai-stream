'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var highland = require('highland');
var Error = require('es6-error');

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
  var isOutdated = false;
  return new Promise(function (onFulfilled, onRejected) {
    setTimeout(function () {
      if (isOutdated) {
        return;
      }
      isOutdated = true;
      onRejected(TimeoutError.create(timeoutMsec));
    }, timeoutMsec);

    highland(stream).toArray(function (data) {
      if (isOutdated) {
        return;
      }
      isOutdated = true;
      onFulfilled();
    });
  });
}

var TimeoutError = function (_Error) {
  _inherits(TimeoutError, _Error);

  function TimeoutError(msg) {
    _classCallCheck(this, TimeoutError);

    var _this = _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, msg));

    _this.message = msg;
    return _this;
  }

  _createClass(TimeoutError, null, [{
    key: 'create',
    value: function create(timeoutMsec) {
      return new TimeoutError('Timeout of ' + timeoutMsec + ' ms exceeded');
    }
  }]);

  return TimeoutError;
}(Error);

module.exports = {
  isStream: isStream,
  isReadable: isReadable,
  isWritable: isWritable,
  waitUntilEndEventFired: waitUntilEndEventFired,
  TimeoutError: TimeoutError
};