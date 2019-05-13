const router = require('express').Router();
const _Teacher = require('./teacher.js');
const teacher_route = require('./web/teacher.js');

module.exports = function(mongoose) {
  const Teacher = _Teacher(mongoose);

  router.use('/teacher', teacher_route(Teacher));

  return router;
}
