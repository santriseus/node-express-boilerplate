const newErrorMiddleware = require('./error-middleware');
module.exports = function newMiddlewares({dependencies, options}) {
  dependencies.logger.debug('Creating middlewares.');
  return {
    errorMiddleware: newErrorMiddleware(dependencies.errors, dependencies.logger),
  };
};
