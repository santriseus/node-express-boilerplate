const sinon = require('sinon');
describe('Logger', () => {
  const newLogger = require('./logger');
  let stdOutWriteStub;
  before(()=>{
    stdOutWriteStub = sinon.stub(process.stdout, 'write');
  });

  beforeEach(()=>{
    stdOutWriteStub.resetHistory();
  });

  after(()=>{
    stdOutWriteStub.restore();
  });

  it('Should create logger with JSON stdout stream by default and write as json', () => {
    const logger = newLogger({options: {level: 'debug', name: 'test'}});
    logger.info('Hello');
    const entry = JSON.parse(stdOutWriteStub.args[0].join(''));
    expect(entry.msg).to.equal('Hello');
  });

  it('Should properly serialize data field as json', () => {
    const logger = newLogger({options: {level: 'debug', name: 'test'}});
    logger.info({data: {key: 'val'}}, 'Error here');
    const entry = JSON.parse(stdOutWriteStub.args[0].join(''));
    expect(entry.data.key).to.equal('val');
  });

  it('Should properly serialize data.error field as json', () => {
    const logger = newLogger({options: {level: 'debug', name: 'test'}});
    logger.error({data: {error: new Error('Test')}}, 'Error here');
    const entry = JSON.parse(stdOutWriteStub.args[0].join(''));
    expect(entry.data.error.message).to.equal('Test');
  });

  it('Should not write with lower level', () => {
    const logger = newLogger({options: {level: 'info', name: 'test'}});
    logger.debug('Hello');
    sinon.assert.notCalled(stdOutWriteStub);
  });

  it('Should create logger with pretty stdout stream by default and write as not JSON', () => {
    const logger = newLogger({options: {level: 'debug', name: 'test', pretty: true}});
    logger.info('Hello');

    expect(()=>{
      JSON.parse(stdOutWriteStub.args[0]);
    }).to.throw();
    expect(stdOutWriteStub.args[0].join('')).to.have.string('Hello');
  });

  it('Should log error to console when emitting error', () => {
    const logger = newLogger({options: {level: 'info', name: 'test'}});
    const spy = sinon.spy(console, 'error');
    logger._events.error('Test');
    sinon.assert.calledWith(spy, 'Test');
    spy.restore();
  });
});
