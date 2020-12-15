module.exports = function newUrlController({dependencies}) {
  const {urlService} = dependencies;
  return {
    createUrl: function createUrl(req, res, next) {
      return urlService.createUrl(req.body).then((result)=>{
        res.status(201).json(result);
      }).catch(next);
    },
    getLongUrl: function getLongUrl(req, res, next) {
      return urlService.getLongUrl(req.params).then((result)=>{
        res.json(result);
      }).catch(next);
    },
  };
};
