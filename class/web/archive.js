const router = require('express').Router();


module.exports = function(Archive) {

  router.post('/', async (req, res) => {
    let response = await Archive.create(req.body);
    if (response.status) {
      res.status(response.status);
    } else if (response.error) {
      res.status(400);
    } else {
      res.status(201);
    }
    res.send(response);
  });

  router.get('/', async (req, res) => {
    let response = await Archive.find_all();
    res.send(response);
  });

  router.get('/:id', async (req, res) => {
    let [record] = await Archive.find({_id: req.params.id});
    if (!record) {
      res.status(404).send({});
    } else {
      res.send(record);
    }
  });

  return router;
}
