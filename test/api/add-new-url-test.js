const {dataHelper, config, request, constants} = require('../test-utilities');

describe('POST /url', () => {
  before(async () => {
    return dataHelper.recreateUrlTable(config.database.tableNames.url);
  });
  it('should return status 400 and serialized error when no "longUrl" provided', async () => {
    return request
        .post('/url')
        .send({
          otherField: constants.LONG_URL_1,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).to.have.all.keys('error');
          expect(response.body.error).to.have.all.keys('name', 'code', 'message', 'status');
          expect(response.body.error.name).to.equal('InvalidDataError');
          expect(response.body.error.code).to.equal('ERR_INVALID_DATA');
        });
  });

  it('should save new url and return status 201', async () => {
    return request
        .post('/url')
        .send({
          longUrl: constants.LONG_URL_1,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).to.have.all.keys('code', 'shortUrl', 'longUrl');
          expect(response.body.code).to.equal(constants.CODE_1);
          expect(response.body.shortUrl).to.equal(config.services.urlPath + constants.CODE_1);
          expect(response.body.longUrl).to.equal(constants.LONG_URL_1);
        });
  });
});
