const router = require('express').Router();


module.exports = function(Archive) {

  router.post('/', async (req, res) => {
    Archive.create(req.body)
    .then(response => {
      console.log({response});
      if (response.status) {
        res.status(response.status);
      } else {
        res.status(201);
      }
      res.json(response);
    })
    .catch(e => {
      res.status(400).json({error: e.message});
    });
  });

  router.get('/', async (req, res) => {
    let response = await Archive.find_all();
    res.send(response);
  });

  router.get('/:id', async (req, res) => {
    Archive.find({_id: req.params.id})
    .then(response => {
      if (!response[0]) {
        res.status(404).send({});
      }
      res.send(response[0]);
    })
    .catch(e => {
      res.status(400).send({message: e.message});
    });
  });

  return router;
}
