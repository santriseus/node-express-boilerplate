module.exports = function newDataHelper({dependencies, options}) {
  return {
    recreateUrlTable: async function(name) {
      try {
        await dependencies.aws.dynamoDB.deleteTable({
          TableName: name,
        }).promise();
      } catch (err) {
        if (err.code !== 'ResourceNotFoundException') {
          throw err;
        }
      }
      await dependencies.aws.dynamoDB.createTable({
        TableName: name,
        AttributeDefinitions: [
          {
            AttributeName: 'PK',
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'PK',
            KeyType: 'HASH',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      }).promise();
      return dependencies.aws.dynamoDBDocumentClient.put({
        TableName: name,
        Item: {
          PK: '__id',
          currentValue: 0,
        },
      }).promise();
    },
    addUrl: async function(name, data) {
      return dependencies.aws.dynamoDBDocumentClient.put({
        TableName: name,
        Item: {
          PK: data.code,
          url: data.url,
        },
      }).promise();
    },
  };
};
