module.exports = function mapRoutes(app, controllers) {
  app.get('/url/:code', controllers.urlController.getLongUrl);
  app.post('/url', controllers.urlController.createUrl);
};
