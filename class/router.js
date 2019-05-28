const router = require('express').Router();


module.exports = function(mongoose) {
  if (process.env.SERVICE !== 'WEB') {
    const model = require(`./${process.env.SERVICE.toLowerCase()}.js`)(mongoose);
    const route = require(`./web/${process.env.SERVICE.toLowerCase()}.js`);

    router.use('/', route(model));
  } else {
    router.use('/', require('./web.js')(mongoose));
  }

  return router;
}
