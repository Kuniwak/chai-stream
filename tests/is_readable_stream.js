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
    isReadable: false,
  },
  {
    name: 'an undefined',
    value: undefined,
    isStream: false,
    isReadable: false,
  },
  {
    name: 'a number',
    value: 0,
    isStream: false,
    isReadable: false,
  },
  {
    name: 'a string',
    value: 'string',
    isStream: false,
    isReadable: false,
  },
  {
    name: 'a boolean ',
    value: true,
    isStream: false,
    isReadable: false,
  },
  {
    name: 'an empty array',
    value: [],
    isStream: false,
    isReadable: false,
  },
  {
    name: 'an empty object',
    value: {},
    isStream: false,
    isReadable: false,
  },
  {
    name: 'a writable stream',
    value: new Writable(),
    isStream: true,
    isReadable: false,
  },
  {
    name: 'a custom no readable stream',
    value: {pipe: () => {}},
    isStream: true,
    isReadable: false,
  },
  {
    name: 'a readable stream',
    value: new Readable(),
    isStream: true,
    isReadable: true,
  },
  {
    name: 'a duplex stream',
    value: new Duplex(),
    isStream: true,
    isReadable: true,
  },
  {
    name: 'a transform stream',
    value: new Transform(),
    isStream: true,
    isReadable: true,
  },
  {
    name: 'a custom readable stream',
    value: {pipe: () => {}, resume: () => {}},
    isStream: true,
    isReadable: true,
  },
];

describe('assert', () => {
  const {assert} = chai;

  describe('.isReadableStream', () => {
    TestCases.forEach((testCase) => {
      if (testCase.isStream && testCase.isReadable) {
        it(`should pass when ${testCase.name} arrived`, () => {
          assert.isReadableStream(testCase.value);
        });
        return;
      }

      it(`should throw an AssertionError when ${testCase.name} arrived`, () => {
        assert.throws(() => {
          assert.isReadableStream(testCase.value);
        }, AssertionError);
      });
    });
  });

  describe('.isNotReadableStream', () => {
    TestCases.forEach((testCase) => {
      if (testCase.isStream && !testCase.isReadable) {
        it(`should pass when ${testCase.name} arrived`, () => {
          assert.isNotReadableStream(testCase.value);
        });
        return;
      }

      it(`should throw an AssertionError when ${testCase.name} arrived`, () => {
        assert.throws(() => {
          assert.isNotReadableStream(testCase.value);
        }, AssertionError);
      });
    });
  });
});

describe('expect', () => {
  const {expect} = chai;

  describe('.to.be.a.ReadableStream', () => {
    TestCases.forEach((testCase) => {
      if (testCase.isStream && testCase.isReadable) {
        it(`should pass when ${testCase.name} arrived`, () => {
          expect(testCase.value).to.be.a.ReadableStream;
        });
        return;
      }

      it(`should throw an AssertionError when ${testCase.name} arrived`, () => {
        expect(() => {
          expect(testCase.value).to.be.a.ReadableStream;
        }).to.throw(AssertionError);
      });
    });
  });

  describe('.to.not.be.a.ReadableStream', () => {
    TestCases.forEach((testCase) => {
      if (testCase.isStream && !testCase.isReadable) {
        it(`should pass when ${testCase.name} arrived`, () => {
          expect(testCase.value).to.not.be.a.ReadableStream;
        });
        return;
      }

      it(`should throw an AssertionError when ${testCase.name} arrived`, () => {
        expect(() => {
          expect(testCase.value).to.not.be.a.ReadableStream;
        }).to.throw(AssertionError);
      });
    });
  });
});
