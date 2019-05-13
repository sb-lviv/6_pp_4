const router = require('express').Router();


module.exports = function() {

  router.get('*', (req, res) => {
    res.send('hello world');
  });

  return router;
}
