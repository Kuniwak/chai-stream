const chai = require('chai');
const {AssertionError} = chai;
const chaiStream = require('../src/index');
chai.use(chaiStream);
const {Readable, Writable, Duplex, Transform} = require('stream');

const TestCases = [
  {
    name: 'a null',
    value: null,
    isStream: false,
    isWritable: false,
  },
  {
    name: 'an undefined',
    value: undefined,
    isStream: false,
    isWritable: false,
  },
  {
    name: 'a number',
    value: 0,
    isStream: false,
    isWritable: false,
  },
  {
    name: 'a string',
    value: 'string',
    isStream: false,
    isWritable: false,
  },
  {
    name: 'a boolean ',
    value: true,
    isStream: false,
    isWritable: false,
  },
  {
    name: 'an empty array',
    value: [],
    isStream: false,
    isWritable: false,
  },
  {
    name: 'an empty object',
    value: {},
    isStream: false,
    isWritable: false,
  },
  {
    name: 'a readable stream',
    value: new Readable(),
    isStream: true,
    isWritable: false,
  },
  {
    name: 'a custom no writable stream',
    value: {pipe: () => {}},
    isStream: true,
    isWritable: false,
  },
  {
    name: 'a writable stream',
    value: new Writable(),
    isStream: true,
    isWritable: true,
  },
  {
    name: 'a duplex stream',
    value: new Duplex(),
    isStream: true,
    isWritable: true,
  },
  {
    name: 'a transform stream',
    value: new Transform(),
    isStream: true,
    isWritable: true,
  },
  {
    name: 'a custom writable stream',
    value: {pipe: () => {}, write: () => {}},
    isStream: true,
    isWritable: true,
  },
];

describe('assert', () => {
  const {assert} = chai;

  describe('.isWritableStream', () => {
    TestCases.forEach((testCase) => {
      if (testCase.isStream && testCase.isWritable) {
        it(`should pass when ${testCase.name} arrived`, () => {
          assert.isWritableStream(testCase.value);
        });
        return;
      }

      it(`should throw an AssertionError when ${testCase.name} arrived`, () => {
        assert.throws(() => {
          assert.isWritableStream(testCase.value);
        }, AssertionError);
      });
    });
  });

  describe('.isNotWritableStream', () => {
    TestCases.forEach((testCase) => {
      if (testCase.isStream && !testCase.isWritable) {
        it(`should pass when ${testCase.name} arrived`, () => {
          assert.isNotWritableStream(testCase.value);
        });
        return;
      }

      it(`should throw an AssertionError when ${testCase.name} arrived`, () => {
        assert.throws(() => {
          assert.isNotWritableStream(testCase.value);
        }, AssertionError);
      });
    });
  });
});

describe('expect()', () => {
  const {expect} = chai;

  describe('.to.be.a.WritableStream', () => {
    TestCases.forEach((testCase) => {
      if (testCase.isStream && testCase.isWritable) {
        it(`should pass when ${testCase.name} arrived`, () => {
          expect(testCase.value).to.be.a.WritableStream;
        });
        return;
      }

      it(`should throw an AssertionError when ${testCase.name} arrived`, () => {
        expect(() => {
          expect(testCase.value).to.be.a.WritableStream;
        }).to.throw(AssertionError);
      });
    });
  });

  describe('.to.not.be.a.WritableStream', () => {
    TestCases.forEach((testCase) => {
      if (testCase.isStream && !testCase.isWritable) {
        it(`should pass when ${testCase.name} arrived`, () => {
          expect(testCase.value).to.not.be.a.WritableStream;
        });
        return;
      }

      it(`should throw an AssertionError when ${testCase.name} arrived`, () => {
        expect(() => {
          expect(testCase.value).to.not.be.a.WritableStream;
        }).to.throw(AssertionError);
      });
    });
  });
});
