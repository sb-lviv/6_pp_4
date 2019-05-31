const CONFIG = require('../config.js');
const router = require('express').Router();
const request = require('request-promise-native');

module.exports = function(mongoose) {
  const TEACHER = `http://localhost:${CONFIG.PORT.TEACHER}`;
  const COURSE  = `http://localhost:${CONFIG.PORT.COURSE }`;
  const STUDENT = `http://localhost:${CONFIG.PORT.STUDENT}`;
  const ARCHIVE = `http://localhost:${CONFIG.PORT.ARCHIVE}`;
  const ObjectId = mongoose.Types.ObjectId;

  /*         */
  /* TEACHER */
  /*         */
  router.post('/teacher', async (req, res) => {
    request.post({url: TEACHER, form: req.body, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  router.get('/teacher', async (req, res) => {
    request.get({url: TEACHER, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  router.get('/teacher/:id', async (req, res) => {
    request.get({url: `${TEACHER}/${req.params.id}`, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  /*          */
  /*  COURSE  */
  /*          */
  router.post('/course', async (req, res) => {
    if (!ObjectId.isValid(req.body.teacher)) {
      res.status(400).json({message: `Invalid id ${req.body.teacher}`});
      return;
    }
    let id = req.body.teacher;
    request.get({url: `${TEACHER}/${id}`, resolveWithFullResponse: true})
    .then(
      r => request.post({url: COURSE, form: req.body, resolveWithFullResponse: true}),
      ({response: {headers: headers}, statusCode, error: body}) => {
        if (statusCode === 404)
          return {headers, statusCode, body: {message: `There is no teacher with id ${id}`}};
        return {headers, statusCode, body};
      })
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  router.get('/course', async (req, res) => {
    request.get({url: COURSE, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  router.get('/course/:id', async (req, res) => {
    request.get({url: `${COURSE}/${req.params.id}`, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  /*         */
  /* STUDENT */
  /*         */
  router.post('/student', async (req, res) => {
    request.post({url: STUDENT, form: req.body, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  router.post('/student/:id/course', async (req, res) => {
    let courses = toArray(req.body.course_id);
    if (courses.length === 0) {
      return res.status(400).json({message: `Please specify course_id`});
    }
    try {
      for await (let id of courses) {
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({message: `Invalid id ${id}`});
        }
        await request.get(`${COURSE}/${id}`);
      }
    } catch(r) {
      if (r.statusCode === 404) {
        res.set(r.response.headers)
           .status(r.statusCode)
           .json({message: `There is no course with id ${r.response.request.path}`});
      } else {
        res.set(r.response.headers).status(r.statusCode).send(r.error);
      }
      return;
    }
    request.post({url: `${STUDENT}/${req.params.id}/course`, form: req.body, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  router.get('/student', async (req, res) => {
    request.get({url: STUDENT, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  router.get('/student/:id', async (req, res) => {
    request.get({url: `${STUDENT}/${req.params.id}`, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  /*         */
  /* ARCHIVE */
  /*         */
  router.post('/archive', async (req, res) => {
    let teacher = request.get(`${TEACHER}/${req.body.teacher}`);
    let student = request.get(`${STUDENT}/${req.body.student}`);
    let course  = request.get(`${COURSE }/${req.body.course }`);
    let r = await Promise.all([teacher, student, course])
        .catch(r => {
          res.status(404).json({message: `id ${r.response.request.path} not found`});
          return null;
        });
    if (!r) return;

    request.post({url: ARCHIVE, form: req.body, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  router.get('/archive', async (req, res) => {
    request.get({url: ARCHIVE, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });

  router.get('/archive/:id', async (req, res) => {
    request.get({url: `${ARCHIVE}/${req.params.id}`, resolveWithFullResponse: true})
    .then(r => res.set(r.headers).status(r.statusCode).send(r.body))
    .catch(r => res.set(r.response.headers).status(r.statusCode).send(r.error));
  });
  return router;
}

function toArray(object) {
  if (object instanceof Array) return object;
  if (object === undefined) return [];
  else return [object];
}
