const AWS = require('aws-sdk');
const newDynamoDBDocumentClient = require('./dynamo-db-document-client');
const newDynamoDB = require('./dynamo-db');

module.exports = function newAWS({dependencies, options}) {
  AWS.config.update({region: 'us-east-1'});
  return {
    dynamoDBDocumentClient: newDynamoDBDocumentClient({
      dependencies: {AWS},
      options: options.dynamoDB,
    }),
    dynamoDB: newDynamoDB({
      dependencies: {AWS},
      options: options.dynamoDB,
    }),
    AWS: AWS,
  };
};
