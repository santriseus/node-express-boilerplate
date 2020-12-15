describe('Errors', () => {
  const errors = require('./../errors');
  it('should serialize all exposed errors to JSON without innerError inside', () => {
    for (const name of Object.keys(errors)) {
      const ErrorConstructor = errors[name];
      const error = JSON.parse((new ErrorConstructor(`Validation error happened`)).toJSON());
      expect(error).to.have.all.keys('name', 'code', 'status', 'message', 'stack');
      expect(error.stack).to.have.string(name);
      expect(error.stack).to.not.have.string('-- End of inner error stack trace ---');
    }
  });
  it('should serialize all exposed errors to JSON with innerError inside', () => {
    for (const name of Object.keys(errors)) {
      const ErrorConstructor = errors[name];
      const error = JSON.parse(new ErrorConstructor(`Validation error happened`,
          {innerError: new RangeError('Some range error message here')}).toJSON());
      expect(error).to.have.all.keys('innerError', 'name', 'code', 'status', 'message', 'stack');
      expect(error.innerError).to.have.all.keys('name', 'message', 'stack');
      expect(error.stack).to.have.string(name);
      expect(error.stack).to.have.string('RangeError');
      expect(error.stack).to.have.string('-- End of inner error stack trace ---');
    }
  });
});
