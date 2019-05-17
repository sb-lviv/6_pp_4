const router = require('express').Router();


module.exports = function(Student) {

  router.post('/', async (req, res) => {
    let response = await Student.create(req.body);
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
    let response = await Student.find_all();
    res.send(response);
  });

  router.get('/:id', async (req, res) => {
    let [student] = await Student.find({_id: req.params.id});
    if (!student) {
      res.status(404).send({});
    } else {
      res.send(student);
    }
  });

  router.post('/:id/course', async (req, res) => {
    let response = await Student.attend_course(req.params.id, req.body.course_id);
    if (response.status) {
      res.status(response.status);
    } else if (response.error) {
      res.status(400);
    } else {
      res.status(200);
    }
    res.json(response);
  });

  return router;
}
