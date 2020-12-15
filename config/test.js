module.exports = {
  aws: {
    dynamoDB: {
      endpoint: 'http://localhost:8000',
    },
    useDummyCredentials: true,
  },
  database: {
    tableNames: {
      url: 'url',
    },
  },
  server: {
    port: 16013,
  },
  logging: {
    level: 'debug',
    pretty: true,
  },
  services: {
    urlPath: 'localhost:16013/',
  },
};
