const router = require('express').Router();


module.exports = function(Course) {

  router.post('/', async (req, res) => {
    let response = await Course.create(req.body);
    console.log({response});
    if (response.status) {
      res.status(response.status);
    } else {
      res.status(201);
    }
    res.json(response);
  });

  router.get('/', async (req, res) => {
    let response = await Course.find_all();
    res.send(response);
  });

  router.get('/:id', async (req, res) => {
    Course.find({_id: req.params.id})
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
