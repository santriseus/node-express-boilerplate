const newValidation = require('./validation');
const sinon = require('sinon');
const errors = require('./../errors');
describe('Validation', () => {
  const {validate, Joi} = newValidation({dependencies: {Joi: require('joi'), errors}});
  it('should throw error if input validation fails', () => {
    const schemas = {input: [Joi.object().required()]};
    const func = sinon.fake();
    const wrapped = validate(func, schemas);
    expect(()=>{
      return wrapped(1);
    }).to.throw('"value" must be of type object');
  });
  it('should throw error if output validation fails for sync function', () => {
    const schemas = {output: Joi.object().required()};
    const func = sinon.fake.returns(5);
    const wrapped = validate(func, schemas);
    expect(()=>{
      return wrapped(1);
    }).to.throw('"value" must be of type object');
  });
  it('should throw error if output validation fails for async function', async () => {
    const schemas = {output: Joi.object().required()};
    const func = sinon.fake.resolves(5);
    const wrapped = validate(func, schemas);
    await wrapped(1).then(()=>{
      throw new Error('Promise should be rejected.');
    }).catch((err)=>{
      expect(err.message).to.equal('"value" must be of type object');
    });
  });
  it('should throw error if unknown is not ignored', () => {
    const schemas = {input: [Joi.object({field: Joi.number()}).required()]};
    const func = sinon.fake();
    const wrapped = validate(func, schemas, {ignoreUnknown: false});
    expect(()=>{
      return wrapped({
        field1: 'field1',
        field: 11,
      });
    }).to.throw('"field1" is not allowed');
  });
  it('should return value if valid input ', () => {
    const schemas = {input: [Joi.object({field1: Joi.string()}).required()]};
    const func = sinon.fake();
    const wrapped = validate(func, schemas);
    wrapped({field1: 'field1'});
    sinon.assert.calledWith(func, {field1: 'field1'});
  });

  it('should return value if valid  input and remove unknown', () => {
    const schemas = {input: [Joi.object({field2: Joi.string()}).required()]};
    const func = sinon.fake();
    const wrapped = validate(func, schemas);
    wrapped({field1: 'field1', field2: 'field2'});
    sinon.assert.calledWith(func, {field2: 'field2'});
  });
});
