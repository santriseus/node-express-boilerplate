module.exports = function newUrlRepository({dependencies, options}) {
  const {dynamoDBDocumentClient} = dependencies;
  const {tableName} = options;
  return {
    createUrl: async function createUrl(code, longUrl) {
      await dynamoDBDocumentClient.put({
        TableName: tableName,
        Item: {
          PK: code,
          url: longUrl,
          createdAt: new Date().toISOString(),
          ConditionExpression: 'attribute_not_exists(PK)',
        },
      }).promise();
    },
    getNextCount: async function getNextCount() {
      const response = await dynamoDBDocumentClient.update({
        TableName: tableName,
        Key: {
          PK: '__id',
        },
        UpdateExpression: 'set currentValue = currentValue + :val',
        ExpressionAttributeValues: {
          ':val': 1,
        },
        ReturnValues: 'UPDATED_NEW',
      }).promise();
      return response.Attributes.currentValue;
    },
    getUrl: async function getUrl(code) {
      const response = await dynamoDBDocumentClient.get({
        TableName: tableName,
        Key: {
          PK: code,
        },
        AttributesToGet: ['url'],
      }).promise();
      return response.Item ? response.Item.url : null;
    },
  };
};
