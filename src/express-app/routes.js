module.exports = function newRoutes({dependencies}) {
  const {app, urlController} = dependencies;
  app.get('/url/:code', urlController.getLongUrl);
  app.post('/url', urlController.createUrl);
};
