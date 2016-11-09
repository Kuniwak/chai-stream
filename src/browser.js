(function() {
  const chaiStream = require('./index');

  if (typeof define === 'function' && define.amd) {
    // AMD
    define(() => {
      return chaiAsPromised;
    });
  } else {
    chai.use(chaiAsPromised);
    self.chaiAsPromised = chaiAsPromised;
  }
});
