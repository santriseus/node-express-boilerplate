const {dataHelper, config, urlHandler, constants} = require('../test-utilities');

describe('getLongUrl', () => {
  before(async () => {
    await dataHelper.recreateUrlTable(config.database.tableNames.url);
    await dataHelper.addUrl(config.database.tableNames.url, {code: constants.CODE_2, url: constants.LONG_URL_2});
  });
  it('should return status 404 and serialized error when no url was found', async () => {
    const event = {
      'pathParameters': {'code': 'fff'},
      'http': {
        'method': 'GET',
        'path': '/my/path',
        'protocol': 'HTTP/1.1',
        'sourceIp': 'IP',
        'userAgent': 'agent',
      },
    };
    const result = await urlHandler.getLongUrl(event);
    expect(result.statusCode).to.equal(404);
    const body = JSON.parse(result.body);
    expect(body).to.have.all.keys('error');
    expect(body.error).to.have.all.keys('name', 'code', 'message', 'status');
    expect(body.error.name).to.equal('UrlNotFoundError');
    expect(body.error.code).to.equal('ERR_URL_NOT_FOUND');
  });
  it('should return long url', async () => {
    const event = {
      'pathParameters': {'code': 'mmm'},
    };
    const result = await urlHandler.getLongUrl(event);
    expect(result.statusCode).to.equal(200);
    const body = JSON.parse(result.body);
    expect(body).to.have.all.keys('code', 'shortUrl', 'longUrl');
    expect(body.longUrl).to.equal(constants.LONG_URL_2);
  });
});
