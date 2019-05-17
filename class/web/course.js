const router = require('express').Router();


module.exports = function(Course) {

  router.post('/', async (req, res) => {
    let response = await Course.create(req.body);
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
    let response = await Course.find_all();
    res.send(response);
  });

  router.get('/:id', async (req, res) => {
    let [course] = await Course.find({_id: req.params.id});
    if (!course) {
      res.status(404).send({});
    } else {
      res.send(course);
    }
  });

  return router;
}
