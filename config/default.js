module.exports = {
  aws: {
    dynamoDB: {},
  },
  database: {
    tableNames: {
      url: 'url',
    },
  },
  express: {
    requestBodySizeLimit: '100kb',
  },
  server: {
    port: 3000,
  },
  logging: {
    level: 'info',
    pretty: false,
  },
  services: {
    urlPath: 'localhost:3000/',
  },
  testing: {
    testApiWithRootUrl: false,
    rootUrlToTestApi: 'localhost:3000',
  },
};
