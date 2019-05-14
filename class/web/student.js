const router = require('express').Router();


module.exports = function(Student) {

  router.post('/', async (req, res) => {
    let response = await Student.create(req.body);
    console.log({response});
    if (response.status) {
      res.status(response.status);
    } else {
      res.status(201);
    }
    res.json(response);
  });

  router.get('/', async (req, res) => {
    let response = await Student.find_all();
    res.send(response);
  });

  router.get('/:id', async (req, res) => {
    Student.find({_id: req.params.id})
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

  router.post('/:id/attend', async (req, res) => {
    Student.attend_course(req.params.id, req.body.course_id)
    .then(response => {
      if (response.status) {
        res.status(response.status);
      }
      res.json(response);
    })
    .catch(e => {
      res.status(400).send({message: e.message});
    });
  });

  return router;
}
