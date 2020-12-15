const sinon = require('sinon');
describe('UrlController', () => {
  it('should have method createUrl and call method of underlying service with proper parameters', () => {
    const urlService = {createUrl: sinon.fake.resolves({key: 'val'})};
    const UrlController = require('./url-controller')({dependencies: {urlService}});
    const req = {body: {'key': 'body'}, params: {'key': 'params'}, query: {'key': 'query'}};
    const res = {status: sinon.fake.returns({json: sinon.fake()})};
    UrlController.createUrl(req, res, sinon.fake());
    sinon.assert.calledWith(urlService.createUrl, req.body);
  });
  it('should have method getLongUrl and call method of underlying service with proper parameters', () => {
    const urlService = {getLongUrl: sinon.fake.resolves({key: 'val'})};
    const UrlController = require('./url-controller')({dependencies: {urlService}});
    const req = {body: {}, params: {'key': 'params'}, query: {}};
    const res = {status: sinon.fake.returns({json: sinon.fake()})};
    UrlController.getLongUrl(req, res, sinon.fake());
    sinon.assert.calledWith(urlService.getLongUrl, req.params);
  });
});
