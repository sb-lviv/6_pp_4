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
    request.post(TEACHER)
    .then(r => res.status(201).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  router.get('/teacher', async (req, res) => {
    request.get(TEACHER)
    .then(r => res.status(200).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  router.get('/teacher/:id', async (req, res) => {
    request.get(`${TEACHER}/${req.params.id}`)
    .then(r => res.status(200).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  /*          */
  /*  COURSE  */
  /*          */
  router.post('/course', async (req, res) => {
    request.post(COURSE)
    .then(r => res.status(201).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  router.get('/course', async (req, res) => {
    request.get(COURSE)
    .then(r => res.status(200).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  router.get('/course/:id', async (req, res) => {
    request.get(`${COURSE}/${req.params.id}`)
    .then(r => res.status(200).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  /*         */
  /* STUDENT */
  /*         */
  router.post('/student', async (req, res) => {
    request.post(STUDENT)
    .then(r => res.status(201).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  router.get('/student', async (req, res) => {
    request.get(STUDENT)
    .then(r => res.status(200).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  router.get('/student/:id', async (req, res) => {
    request.get(`${STUDENT}/${req.params.id}`)
    .then(r => res.status(200).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  /*         */
  /* ARCHIVE */
  /*         */
  router.post('/archive', async (req, res) => {
    request.post(ARCHIVE)
    .then(r => res.status(201).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  router.get('/archive', async (req, res) => {
    request.get(ARCHIVE)
    .then(r => res.status(200).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });

  router.get('/archive/:id', async (req, res) => {
    request.get(`${ARCHIVE}/${req.params.id}`)
    .then(r => res.status(200).json(r))
    .catch(e => res.set(e.response.headers).status(e.statusCode).send(e.error));
  });
  return router;
}
