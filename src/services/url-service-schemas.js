module.exports = function newGameServiceSchemas(Joi) {
  return {
    addNewUrlSchemas: {
      input: [
        Joi.object({
          longUrl: Joi.string()
              .trim()
              .uri()
              .max(2048)
              .required(),
        }).required(),
      ],
      output: Joi.object({
        code: Joi.string().required(),
        longUrl: Joi.string().required(),
        shortUrl: Joi.string().required(),
      }).required(),
    },
    getFullUrlSchemas: {
      input: [
        Joi.object({
          code: Joi.string()
              .trim()
              .max(50)
              .required(),
        }).required(),
      ],
      output: Joi.object({
        code: Joi.string().required(),
        longUrl: Joi.string().required(),
        shortUrl: Joi.string().required(),
      }).required(),
    },
  };
};
