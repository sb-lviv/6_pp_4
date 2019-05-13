const router = require('express').Router();


module.exports = function(Teacher) {

  router.post('/', async (req, res) => {
    let response = await Teacher.create(req.body);
    res.status(201).send(response);
  });

  router.get('/', async (req, res) => {
    let response = await Teacher.find_all();
    res.send(response);
  });

  router.get('/:id', async (req, res) => {
    Teacher.find({_id: req.params.id})
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
