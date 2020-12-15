const {dataHelper, config, request, constants} = require('../test-utilities');

describe('GET /url/:code', () => {
  before(async () => {
    await dataHelper.recreateUrlTable(config.database.tableNames.url);
    await dataHelper.addUrl(config.database.tableNames.url, {code: constants.CODE_2, url: constants.LONG_URL_2});
  });
  it('should return status 404 and serialized error when no url was found', async () => {
    return request
        .get('/url/fff')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
          expect(response.body).to.have.all.keys('error');
          expect(response.body.error).to.have.all.keys('name', 'code', 'message', 'status');
          expect(response.body.error.name).to.equal('UrlNotFoundError');
          expect(response.body.error.code).to.equal('ERR_URL_NOT_FOUND');
        });
  });
  it('should return long url', async () => {
    return request
        .get('/url/mmm')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.all.keys('code', 'shortUrl', 'longUrl');
          expect(response.body.longUrl).to.equal(constants.LONG_URL_2);
        });
  });
});
