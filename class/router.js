const router = require('express').Router();
const _Teacher = require('./teacher.js');
const _Course = require('./course.js');
const teacher_route = require('./web/teacher.js');
const course_route = require('./web/course.js');

module.exports = function(mongoose) {
  const Teacher = _Teacher(mongoose);
  const Course = _Course(mongoose, Teacher);

  router.use('/teacher', teacher_route(Teacher));
  router.use('/course', course_route(Course));

  return router;
}
