'use strict';

(function () {
  var chaiStream = require('./index');

  if (typeof define === 'function' && define.amd) {
    // AMD
    define(function () {
      return chaiAsPromised;
    });
  } else {
    chai.use(chaiAsPromised);
    self.chaiAsPromised = chaiAsPromised;
  }
});