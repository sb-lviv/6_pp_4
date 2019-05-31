const CONFIG = require('../config.js');
const router = require('express').Router();
const request = require('request-promise-native');

module.exports = function(mongoose) {
  const TEACHER = `http://localhost:${CONFIG.PORT.TEACHER}`;
  const COURSE  = `http://localhost:${CONFIG.PORT.COURSE }`;
  const STUDENT = `http://localhost:${CONFIG.PORT.STUDENT}`;
  const ARCHIVE = `http://localhost:${CONFIG.PORT.ARCHIVE}`;

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
    request.post({url: COURSE, form: req.body, resolveWithFullResponse: true})
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
