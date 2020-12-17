const express = require('express');
const cors = require('cors');
const newRoutes = require('./routes');
const newUrlController = require('./controllers/url-controller');
const newErrorMiddleware = require('./middlewares/error-middleware');
module.exports = function newExpressApp({dependencies, options}) {
  const {urlService, logger, errors} = dependencies;
  const urlController = newUrlController({dependencies: {urlService}});
  const errorMiddleware = newErrorMiddleware({dependencies: {errors, logger}});
  const app = express();
  app.use(express.json({limit: options.requestBodySizeLimit}));
  app.use(cors());
  newRoutes({dependencies: {app, urlController}});
  app.use(errorMiddleware);
  return app;
};
