module.exports = {
  aws: {
    dynamoDB: {
    },
  },
  database: {
    tableNames: {
      url: 'DYNAMODB_URL_TABLE',
    },
  },
  express: {
    requestBodySizeLimit: 'REQ_BODY_SIZE_LIMIT',
  },
  services: {
    urlPath: 'URL_PATH',
  },
  server: {
    port: {
      '__name': 'PORT',
      '__format': 'json',
    },
  },
  logging: {
    level: 'LOGGING_LEVEL',
    pretty: {
      '__name': 'LOG_PRETTY',
      '__format': 'json',
    },
  },
};
