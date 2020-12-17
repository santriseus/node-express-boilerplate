module.exports = function newDataHelper({dependencies, options}) {
  return {
    recreateUrlTable: async function(name) {
      try {
        await dependencies.dynamoDB.deleteTable({
          TableName: name,
        }).promise();
      } catch (err) {
        if (err.code !== 'ResourceNotFoundException') {
          throw err;
        }
      }
      await dependencies.dynamoDB.createTable({
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
      return dependencies.dynamoDBDocumentClient.put({
        TableName: name,
        Item: {
          PK: '__id',
          currentValue: 0,
        },
      }).promise();
    },
    deleteCounter: async function(name) {
      return dependencies.dynamoDBDocumentClient.delete({
        TableName: name,
        Key: {
          PK: '__id',
        },
      }).promise();
    },
    addUrl: async function(name, data) {
      return dependencies.dynamoDBDocumentClient.put({
        TableName: name,
        Item: {
          PK: data.code,
          url: data.url,
        },
      }).promise();
    },
  };
};
