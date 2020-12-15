module.exports = function({dependencies, options}) {
  return new dependencies.AWS.DynamoDB({apiVersion: '2012-08-10', endpoint: options.endpoint});
};
