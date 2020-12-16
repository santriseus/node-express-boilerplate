const sinon = require('sinon');
const newUrlRepository = require('./url-repository');
const dynamoDBDocumentClient = {};
const urlRepository = newUrlRepository({
  dependencies: {dynamoDBDocumentClient},
  options: {tableName: 'url'},
});

describe('UrlRepository', () => {
  it('should increment counter on getNextCount', async () => {
    const updateFake = sinon.fake.resolves({Attributes: {currentValue: 42}});
    dynamoDBDocumentClient.update = () =>{
      return {
        promise: updateFake,
      };
    };
    const count = await urlRepository.getNextCount();
    expect(count).to.equal(42);
    sinon.assert.called(updateFake);
  });
  it('should create non-existing counter and increment counter on getNextCount', async () => {
    const updateStub = sinon.stub();
    const putFake = sinon.fake.resolves();
    updateStub.onCall(0).rejects({code: 'ValidationException'});
    updateStub.onCall(1).resolves({Attributes: {currentValue: 42}});
    dynamoDBDocumentClient.update = () =>{
      return {
        promise: updateStub,
      };
    };
    dynamoDBDocumentClient.put = () =>{
      return {
        promise: putFake,
      };
    };
    const count = await urlRepository.getNextCount();
    expect(count).to.equal(42);
    sinon.assert.calledTwice(updateStub);
    sinon.assert.called(putFake);
  });

  it('should create non-existing counter and increment counter on getNextCount', async () => {
    const updateStub = sinon.stub();
    updateStub.onCall(0).rejects(new Error('Some error'));
    dynamoDBDocumentClient.update = () =>{
      return {
        promise: updateStub,
      };
    };
    await expect(urlRepository.getNextCount()).to.be.rejectedWith(Error);
    sinon.assert.calledOnce(updateStub);
  });
  it('should save new url on createUrl ang get it value via the getUrl', async () => {
    const putFake = sinon.fake.resolves();
    dynamoDBDocumentClient.put = () =>{
      return {
        promise: putFake,
      };
    };
    const fullUrl = 'https://www.youtube.com/watch?v=2Z4m4lnjxkY';
    const shortUrlKey = 'trololo';
    await urlRepository.createUrl(shortUrlKey, fullUrl );
    sinon.assert.called(putFake);
  });

  it('should get url via the getUrl', async () => {
    const getFake = sinon.fake.resolves({Item: {url: 'https://www.youtube.com/watch?v=2Z4m4lnjxkY'}});
    dynamoDBDocumentClient.get = () =>{
      return {
        promise: getFake,
      };
    };
    const fullUrl = 'https://www.youtube.com/watch?v=2Z4m4lnjxkY';
    const shortUrlKey = 'trololo';
    await urlRepository.createUrl(shortUrlKey, fullUrl );
    const url = await urlRepository.getUrl('trololo');
    expect(url).to.equal(fullUrl);
    sinon.assert.called(getFake);
  });

  it('should get null via the getUrl if no item returned', async () => {
    const getNull = sinon.fake.resolves({});
    dynamoDBDocumentClient.get = () =>{
      return {
        promise: getNull,
      };
    };
    const url = await urlRepository.getUrl('trololo');
    expect(url).to.equal(null);
    sinon.assert.called(getNull);
  });
});
