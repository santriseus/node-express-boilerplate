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
        },
        ConditionExpression: 'attribute_not_exists(PK)',
      }).promise();
    },
    getNextCount: async function getNextCount() {
      return dynamoDBDocumentClient.update({
        TableName: tableName,
        Key: {
          PK: '__id',
        },
        UpdateExpression: 'set currentValue = currentValue + :val',
        ExpressionAttributeValues: {
          ':val': 1,
        },
        ReturnValues: 'UPDATED_NEW',
      }).promise().then((response) => response.Attributes.currentValue).catch(async (err) =>{
        if (err.code === 'ValidationException') {
          await dynamoDBDocumentClient.put({
            TableName: tableName,
            Item: {
              PK: '__id',
              currentValue: 0,
            },
            ConditionExpression: 'attribute_not_exists(PK)',
          }).promise();

          return dynamoDBDocumentClient.update({
            TableName: tableName,
            Key: {
              PK: '__id',
            },
            UpdateExpression: 'set currentValue = currentValue + :val',
            ExpressionAttributeValues: {
              ':val': 1,
            },
            ReturnValues: 'UPDATED_NEW',
          }).promise().then((response) => response.Attributes.currentValue);
        } else {
          throw err;
        }
      });
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
