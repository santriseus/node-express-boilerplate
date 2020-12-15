const sinon = require('sinon');
describe('NodeProcessManager', () => {
  const newNodeProcessManager = require('./node-process-helper');
  it('should handle uncaughtException and unhandledRejection and write to log', () => {
    const process = {on: function(name, cb) {
      if (name === 'uncaughtException') {
        cb(new Error('Uncaught'));
      } else {
        cb(new Error('Unhandled'), Promise.reject(new Error('Unhandled')));
      }
    }, exit: sinon.fake()};
    const logger = {error: sinon.fake(), fatal: sinon.fake()};
    const pm = newNodeProcessManager({dependencies: {process}});
    const stub = sinon.stub(console, 'error');
    pm.handleUncaughtException(logger);
    sinon.assert.calledWith(process.exit, 1);
    sinon.assert.called(logger.fatal);
    sinon.assert.called(stub);
    pm.handleUnhandledRejection(logger);
    sinon.assert.called(logger.error);
    sinon.assert.calledTwice(stub);
    stub.restore();
  });
});
