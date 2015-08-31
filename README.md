chai-stream
===========

[![Build Status](https://travis-ci.org/Kuniwak/chai-stream.svg?branch=master)](https://travis-ci.org/Kuniwak/chai-stream)
[![npm version](https://badge.fury.io/js/chai-stream.svg)](http://badge.fury.io/js/chai-stream)

Extends Chai with assertions about streams.


Install
-------

### Node.js

```shell
npm install --save-dev chai-stream
``` 


### AMD

```javascript
define(function(require, exports, module) {
  var chai = require('chai');
  var chaiStream = require('chai-stream');
  
  chai.use(chaiStream);
});
```


### script tag

```html
<script src="chai.js"></script>
<script src="chai-stream.js"></script>
```


Usage
-----

### BDD-Style

```javascript
var chai = require('chai');
var chaiStream = require('chai-stream');
chai.use(chaiStream);

var expect = chai.expect;

describe('getMyStream', function() {
  it('should return a readable stream', function() {
    var stream = getMyStream();

    expect(stream).to.be.a.ReadableStream;
  });

  it('should return a stream that will end', function() {
    var stream = getMyStream();

    return expect(stream).to.end;
  });
});
```


#### expect(obj).to.be.a.Stream

Type: `function(any)`

This assertion check that the specified object have a `pipe` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### expect(obj).to.be.a.ReadableStream

Type: `function(any)`

This assertion check that the specified object have a `pipe` and `resume` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### expect(obj).to.be.a.WritableStream

Type: `function(any)`

This assertion check that the specified object have a `pipe` and `write` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### expect(obj).to.end

Type: `function(any): Promise<void>`

Returns a promise that fulfilled when a `end` event is fired.
And this function force the stream to read (like piping with `WritableStream`).


##### obj

Type: `any`

`waitUntilStreamEnd` listen `end` or `error` event of the stream.


### TDD-Style

```javascript
var chai = require('chai');
var chaiStream = require('chai-stream');
chai.use(chaiStream);

var assert = chai.assert;

describe('getMyStream', function() {
  it('should return a readable stream', function() {
    var stream = getMyStream();

    assert.isReadableStream(stream);
  });

  it('should return a stream that will end', function() {
    var stream = getMyStream();

    return assert.streamWillEnd(stream);
  });
});
```


#### assert.isStream(obj)

Type: `function(any)`

This assertion check that the specified object have a `pipe` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### assert.isReadableStream(obj)

Type: `function(any)`

This assertion check that the specified object have a `pipe` and `resume` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### assert.isWritableStream(obj)

Type: `function(any)`

This assertion check that the specified object have a `pipe` and `write` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### assert.streamWillEnd(obj)

Type: `function(any): Promise<void>`

Returns a promise that fulfilled when a `end` event is fired.
And this function force the stream to read (like piping with `WritableStream`).


##### obj

Type: `any`

`waitUntilStreamEnd` listen `end` or `error` event of the stream.


License
-------

[MIT](https://github.com/Kuniwak/chai-stream/blob/master/LICENSE) (c) [Kuniwak](https://github.com/Kuniwak)
