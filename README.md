# Node.js REST API Boilerplate

[![Build Status](https://travis-ci.com/santriseus/node-express-boilerplate.svg?branch=main)](https://travis-ci.com/santriseus/node-express-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/santriseus/node-express-boilerplate/badge.svg?branch=main)](https://coveralls.io/github/santriseus/node-express-boilerplate?branch=main)

This repository contains the simple [URL shortener](https://en.wikipedia.org/wiki/URL_shortening) REST API implementation.
It could be used as an example when building your web applications using the Node.js.

## Features:
- Layered architecture
- Configuration management
- Proper error handling and errors serialization
- Custom errors definitions
- Unit testing and code coverage metrics
- API and integration testing
- Data validation
- Code style checking
- Structured Logging
- Running infrastructure dependencies via docker-compose for testing and local development
- Could be hosted as common web app or as a serverless lambda function.
- "Infrastructure as code (IaC)" for serverless deployment

## Notes
Below will be the notes which explains some solutions or chosen libraries or approaches.
### Deployment and hosting
Initial idea is to develop the application as traditional express.js server app, but create possibility of deploying the whole server to lambda function and use Infrastructure as code (IaC) approach provided by the [serverless](https://www.npmjs.com/package/serverless). Any time you could move to the classical server approach and run the `src/server.js` in node, PM2 or just calling the `npm start`. 
### Dependency injection
I tried to unify the injection of dependencies to modules by exporting the factory function from modules and passing the `{properties: {...}, options: {...}}` as params.
Injecting dependencies that way helps a lot to write unit-tests and mock the dependencies using the sinon library. I try to avoid of unnecessary `require(...)` calls until it is not some utility method which does not have any configuration or state hidden inside. Otherwise you will end by hacking a lot with libraries like [proxyquire](https://www.npmjs.com/package/proxyquire).
### Configuration management 
Configuration management is done using the [config](https://www.npmjs.com/package/config) library. It has a nice hierarchy of config files, you could use default files, separate configuration files per environment and set variables from the `process.ENV` in the `config/custom-environment-variables.js`. If you want to sotre some sensitive credentials you can create a `config/local.js` file with credentials and it will be ignored in git.
### Running dependencies locally (databases etc.)
For running dependencies you should have the `docker-compose` installed. You could start/stop them manually using the `docker-compose.yml` or by running the `npm run deps` `npm run stop-deps`
### Testing and code coverage
Code coverage is collected only for the unit-test. Unit tests are run using the `npm run unit-test`. Integration and API tests requires all the dependencies to be started and could be run using the `npm run integration-tests` and `npm run api-tests`.
Default `npm test` will run the unit-test, start the dependencies via the docker-compose and then run integration and api tests.
