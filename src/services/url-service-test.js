const sinon = require('sinon');
const errors = require('./../errors');
const validation = require('./../utilities/validation')({
  dependencies: {
    Joi: require('joi'),
    errors: require('./../errors'),
  },
});
const urlEncoder = {encode: sinon.fake.returns('45gDs')};
const newUrlService = require('./url-service');

const dependencies = {
  validation,
  urlEncoder,
  errors,
};

describe('Url Service', () => {
  it('should create new url', async () => {
    const urlRepository = {
      getNextCount: sinon.fake.resolves(42),
      createUrl: sinon.fake.resolves(),
    };
    const urlService = newUrlService({
      dependencies: {
        urlRepository,
        ...dependencies,
      },
      options: {urlPath: 'http://localhost:8000/'},
    });
    const result = await urlService.createUrl({longUrl: 'https://www.youtube.com/watch?v=2Z4m4lnjxkY'});
    expect(result.code).to.equal('45gDs');
    expect(result.shortUrl).to.equal('http://localhost:8000/45gDs');
    sinon.assert.calledWith(urlEncoder.encode, 42);
    sinon.assert.called(urlRepository.getNextCount);
    sinon.assert.calledWith(urlRepository.createUrl, '45gDs', 'https://www.youtube.com/watch?v=2Z4m4lnjxkY');
  });
  it('should get full url', async () => {
    const urlRepository = {
      getUrl: sinon.fake.resolves('https://www.youtube.com/watch?v=2Z4m4lnjxkY'),
    };
    const urlService = newUrlService({
      dependencies: {
        urlRepository,
        ...dependencies,
      },
      options: {urlPath: 'http://localhost:8000/'},
    });
    const result = await urlService.getLongUrl({code: '45gDs'});
    expect(result.longUrl).to.equal('https://www.youtube.com/watch?v=2Z4m4lnjxkY');
    sinon.assert.calledWith(urlRepository.getUrl, '45gDs');
  });
  it('should throw error if no url found', async () => {
    const urlRepository = {
      getUrl: sinon.fake.resolves(null),
    };
    const urlService = newUrlService({
      dependencies: {
        urlRepository,
        ...dependencies,
      },
      options: {urlPath: 'http://localhost:8000/'},
    });
    await expect(urlService.getLongUrl({code: '45gDs'})).be.rejectedWith(errors.UrlNotFoundError);
    sinon.assert.calledWith(urlRepository.getUrl, '45gDs');
  });
});
