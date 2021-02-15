const config = require('config');
const newDependencies = require('./dependencies');
describe('Dependencies', () => {
  it('should create dependencies using config', async () => {
    const dependencies = newDependencies({options: config});
    expect(dependencies).to.have.all.keys(
        'validation',
        'logger',
        'urlEncoder',
        'dynamoDBDocumentClient',
        'urlRepository',
        'urlService',
        'dynamoDB',
        'urlHandler',
    );
  });
});
