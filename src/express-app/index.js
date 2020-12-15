const express = require('express');
const cors = require('cors');
const mapRoutes = require('./routes');
const newControllers = require('./controllers');
const newMiddlewares = require('./middlewares');
module.exports = function newExpressApp({dependencies, options}) {
  const {services, logger, errors} = dependencies;
  const controllers = newControllers({dependencies: {services, logger}});
  const middlewares = newMiddlewares({dependencies: {errors, logger}});
  const app = express();
  app.use(express.json({limit: options.requestBodySizeLimit}));
  app.use(cors());
  mapRoutes(app, controllers);
  app.use(middlewares.errorMiddleware);
  return app;
};
