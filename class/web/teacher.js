const router = require('express').Router();


module.exports = function(Teacher) {

  router.post('/', async (req, res) => {
    let response = await Teacher.create(req.body);
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
    let response = await Teacher.find_all();
    res.send(response);
  });

  router.get('/:id', async (req, res) => {
    let teachers = await Teacher.find({_id: req.params.id})
    if (!teachers[0]) {
      res.status(404).send({});
    }
    res.send(teachers[0]);
  });

  return router;
}
