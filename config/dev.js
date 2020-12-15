module.exports = {
  aws: {
    dynamoDB: {},
  },
  database: {
    tableNames: {
      url: 'url',
    },
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
