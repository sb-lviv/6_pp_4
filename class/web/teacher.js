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
    let [teacher] = await Teacher.find({_id: req.params.id})
    if (!teacher) {
      res.status(404).send({});
    } else {
      res.send(teacher);
    }
  });

  return router;
}
