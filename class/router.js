const router = require('express').Router();

const _Teacher = require('./teacher.js');
const _Course = require('./course.js');
const _Student = require('./student.js');
const _Archive = require('./archive.js');

const teacher_route = require('./web/teacher.js');
const course_route = require('./web/course.js');
const student_route = require('./web/student.js');
const archive_route = require('./web/archive.js');


module.exports = function(mongoose) {
  const Teacher = _Teacher(mongoose);
  const Course = _Course(mongoose, Teacher);
  const Student = _Student(mongoose, Course);
  const Archive = _Archive(mongoose, Teacher, Course, Student);

  router.use('/teacher', teacher_route(Teacher));
  router.use('/course', course_route(Course));
  router.use('/student', student_route(Student));
  router.use('/archive', archive_route(Archive));

  return router;
}
