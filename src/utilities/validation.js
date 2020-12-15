module.exports = function newValidation({dependencies}) {
  return {
    validate: function(func, schemas, options = {stripUnknown: true}) {
      return function(...args) {
        const validatedArgs = [];
        if (schemas.input) {
          for (let i = 0; i < args.length; i++) {
            try {
              validatedArgs.push(dependencies.Joi.attempt(args[i], schemas.input[i], options));
            } catch (err) {
              throw new dependencies.errors.InvalidDataError(err.message, {innerError: err});
            }
          }
        }
        let result = func.apply(this, validatedArgs);
        if (schemas.output) {
          if (result && (result instanceof Promise || result.then instanceof Function)) {
            result = result.then(function(output) {
              return dependencies.Joi.attempt(output, schemas.output, options);
            });
          } else {
            result = dependencies.Joi.attempt(result, schemas.output, options);
          }
        }
        return result;
      };
    },
    Joi: dependencies.Joi,
  };
};
