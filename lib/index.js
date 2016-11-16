'use strict';

var Promise = require('es6-promise');
var highland = require('highland');

function chaiStream(chai, utils) {
  require('./assert')(chai, utils);
  require('./expect')(chai, utils);
}

module.exports = chaiStream;