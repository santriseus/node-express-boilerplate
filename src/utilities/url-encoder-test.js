const newUrlEncoder = require('./url-encoder');
describe('Url Encoder', () => {
  const encoder = newUrlEncoder();
  it('should encode number and return string', () => {
    expect(encoder.encode(777)).to.be.string;
  });
});
