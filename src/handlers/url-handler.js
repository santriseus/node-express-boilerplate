module.exports = function newUrlHandler({dependencies}) {
  const {urlService, errorHandler} = dependencies;
  return {
    createUrl: async function createUrl(event) {
      try {
        const result = await urlService.createUrl(JSON.parse(event.body));
        return {
          statusCode: 201,
          body: JSON.stringify(result),
        };
      } catch (err) {
        return errorHandler(err, event);
      }
    },
    getLongUrl: async function getLongUrl(event) {
      try {
        const result = await urlService.getLongUrl(event.pathParameters);
        return {
          statusCode: 200,
          body: JSON.stringify(result),
        };
      } catch (err) {
        return errorHandler(err, event);
      }
    },
  };
};
