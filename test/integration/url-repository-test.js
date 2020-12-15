const {dataHelper, config, repositories: {urlRepository}} = require('../test-utilities');

describe('UrlRepository', () => {
  before(async () => {
    return dataHelper.recreateUrlTable(config.database.tableNames.url);
  });
  it('should increment counter on getNextCount', async () => {
    await urlRepository.getNextCount();
    await urlRepository.getNextCount();
    await urlRepository.getNextCount();
    await urlRepository.getNextCount();
    const count = await urlRepository.getNextCount();
    expect(count).to.equal(5);
  });
  it('should save new url on createUrl ang get it value via the getUrl', async () => {
    const fullUrl = 'https://www.youtube.com/watch?v=2Z4m4lnjxkY';
    const shortUrlKey = 'trololo';
    await urlRepository.createUrl(shortUrlKey, fullUrl );
    const url = await urlRepository.getUrl(shortUrlKey);
    expect(url).to.equal(fullUrl);
  });
});