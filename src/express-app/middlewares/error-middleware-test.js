const sinon = require('sinon');
const errors = require('./../../errors');
const newErrorMiddleware = require('./error-middleware');
describe('Error Middleware', () => {
  it('should wrap errors without status', () => {
    const logger = {info: sinon.fake(), error: sinon.fake()};
    const json = sinon.fake();
    const res = {status: sinon.fake.returns({json})};
    const req = {method: 'METHOD', path: '/path'};
    const errorMiddleware = newErrorMiddleware(errors, logger);
    const err = new Error('Some error.');
    errorMiddleware(err, req, res);
    const response = json.args[0][0];
    expect(response.error).to.have.all.keys('name', 'code', 'status', 'message');
    expect(response.error.name).to.equal('InternalServerError');
    expect(response.error.message).to.equal('Internal server error occurred at METHOD /path');
    sinon.assert.called(logger.error);
  });
  it('should not wrap errors with status', () => {
    const logger = {info: sinon.fake(), error: sinon.fake()};
    const json = sinon.fake();
    const res = {status: sinon.fake.returns({json})};
    const req = {method: 'METHOD', path: '/path'};
    const errorMiddleware = newErrorMiddleware(errors, logger);
    const err = new errors.InvalidDataError('Invalid data');
    errorMiddleware(err, req, res);
    const response = json.args[0][0];
    expect(response.error).to.have.all.keys('name', 'code', 'status', 'message');
    expect(response.error.name).to.equal('InvalidDataError');
    sinon.assert.called(logger.info);
  });
  it('should not wrap objects with status', () => {
    const logger = {info: sinon.fake(), error: sinon.fake()};
    const json = sinon.fake();
    const res = {status: sinon.fake.returns({json})};
    const req = {method: 'METHOD', path: '/path'};
    const errorMiddleware = newErrorMiddleware(errors, logger);
    const err = {message: 'message', status: 400};
    errorMiddleware(err, req, res);
    const response = json.args[0][0];
    expect(response.error).to.have.all.keys('message', 'status');
    sinon.assert.called(logger.info);
  });
});
