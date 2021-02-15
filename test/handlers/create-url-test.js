const {dataHelper, config, urlHandler, constants} = require('../test-utilities');

describe('createUrl', () => {
  before(async () => {
    return dataHelper.recreateUrlTable(config.database.tableNames.url);
  });
  it('should return status 400 and serialized error when no "longUrl" provided', async () => {
    const event = {
      'body': JSON.stringify({
        otherField: constants.LONG_URL_1,
      }),
      'http': {
        'method': 'POST',
        'path': '/my/path',
        'protocol': 'HTTP/1.1',
        'sourceIp': 'IP',
        'userAgent': 'agent',
      },
    };
    const result = await urlHandler.createUrl(event);
    expect(result.statusCode).to.equal(400);
    const body = JSON.parse(result.body);
    expect(body).to.have.all.keys('error');
    expect(body.error).to.have.all.keys('name', 'code', 'message', 'status');
    expect(body.error.name).to.equal('InvalidDataError');
    expect(body.error.code).to.equal('ERR_INVALID_DATA');
  });

  it('should save new url and return status 201', async () => {
    const event = {
      body: JSON.stringify({
        longUrl: constants.LONG_URL_1,
      }),
    };
    const result = await urlHandler.createUrl(event);
    expect(result.statusCode).to.equal(201);
    const body = JSON.parse(result.body);
    expect(body).to.have.all.keys('code', 'shortUrl', 'longUrl');
    expect(body.code).to.equal(constants.CODE_1);
    expect(body.shortUrl).to.equal(config.services.urlPath + constants.CODE_1);
    expect(body.longUrl).to.equal(constants.LONG_URL_1);
  });
});
