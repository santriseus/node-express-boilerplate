const newUrlRepository = require('./url-repository');
module.exports = function newRepositories({dependencies, options}) {
  const {aws} = dependencies;
  const {tableNames} = options;
  dependencies.logger.debug('Creating repositories.');
  return {
    urlRepository: newUrlRepository({
      dependencies: {dynamoDBDocumentClient: aws.dynamoDBDocumentClient},
      options: {tableName: tableNames.url},
    }),
  };
};
