const chai = require('chai');
const {AssertionError} = chai;
const chaiStream = require('../src/index');
chai.use(chaiStream);
const {Readable, Writable, Duplex, Transform} = require('stream');

const casesForNoStream = [
  {name: 'a null', value: null},
  {name: 'an undefined', value: undefined},
  {name: 'a number', value: 0},
  {name: 'a string', value: 'string'},
  {name: 'a boolean ', value: true},
  {name: 'an empty array', value: []},
  {name: 'an empty object', value: {}},
];
const casesForStream = [
  {name: 'a readable stream', value: new Readable()},
  {name: 'a writable stream', value: new Writable()},
  {name: 'a duplex stream', value: new Duplex()},
  {name: 'a transform stream', value: new Transform()},
  {name: 'a custom stream', value: {pipe: () => {}}},
];

describe('assert', () => {
  const {assert} = chai;

  describe('.isStream', () => {
    casesForNoStream.forEach((caseForNoStream) => {
      it(`should throw an AssertionError when ${caseForNoStream.name}`, () => {
        assert.throws(() => {
          assert.isStream(caseForNoStream.value);
        }, AssertionError);
      });
    });

    casesForStream.forEach((caseForStream) => {
      it(`should pass when ${caseForStream.name}`, () => {
        assert.isStream(caseForStream.value);
      });
    });
  });

  describe('.isNotStream', () => {
    casesForNoStream.forEach((caseForNoStream) => {
      it(`should pass when ${caseForNoStream.name}`, () => {
        assert.isNotStream(caseForNoStream.value);
      });
    });

    casesForStream.forEach((caseForStream) => {
      it(`should throw an AssertionError when ${caseForStream.name}`, () => {
        assert.throws(() => {
          assert.isNotStream(caseForStream.value);
        }, AssertionError);
      });
    });
  });
});

describe('expect', () => {
  const {expect} = chai;

  describe('to.be.a.stream', () => {
    casesForNoStream.forEach((caseForNoStream) => {
      it(`should throw an AssertionError when ${caseForNoStream.name}`, () => {
        expect(() => {
          expect(caseForNoStream.value).to.be.a.Stream;
        }).to.throw(AssertionError);
      });
    });

    casesForStream.forEach((caseForStream) => {
      it(`should pass when ${caseForStream.name}`, () => {
        expect(caseForStream.value).to.be.a.Stream;
      });
    });
  });

  describe('to.not.be.a.stream', () => {
    casesForNoStream.forEach((caseForStream) => {
      it(`should pass when ${caseForStream.name}`, () => {
        expect(caseForStream.value).to.not.be.a.Stream;
      });
    });

    casesForStream.forEach((caseForStream) => {
      it(`should throw an AssertionError when ${caseForStream.name}`, () => {
        expect(() => {
          expect(caseForStream.value).to.not.be.a.Stream;
        }).to.throw(AssertionError);
      });
    });
  });
});
