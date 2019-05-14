
module.exports = function(mongoose, Course) {
  const Schema = new mongoose.Schema({
    name: String,
    courses: [mongoose.Schema.Types.ObjectId],
  });
  const Student = mongoose.model('Student', Schema);
  const ObjectId = mongoose.Types.ObjectId;

  async function create(student) {
    delete student.courses;
    return Student.create(student);
  }

  async function find_all() {
    return Student.find().exec();
  }

  async function find(info) {
    return Student.find(info).exec();
  }

  async function attend_course(student_id, course_id) {
    let courses = await Course.find({_id: course_id});
    if (!courses || !courses[0]) {
      return {
        error: `Course with id ${course_id} not found`,
        status: 404,
      };
    }
    let student = await Student.findOne({_id: student_id});
    if (!student || !student._id) {
      return {
        error: `Student with id ${student_id} not found`,
        status: 404,
      };
    }
    return Student.updateOne({_id: student_id}, {$addToSet: {courses: (course_id)}});
  }

  return {
    create,
    find_all,
    find,
    attend_course,
    class: Student,
  };
}
