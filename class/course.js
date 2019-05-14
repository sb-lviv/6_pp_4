
module.exports = function(mongoose, Teacher) {
  const Schema = new mongoose.Schema({
    name: String,
    teacher: mongoose.Schema.Types.ObjectId,
  });
  const Course = mongoose.model('Course', Schema);

  function create(course) {
    let errors = [];
    let teachers = await Teacher.find({_id: course.teacher});
    if (!teachers || !teachers[0]) {
      return {
        error: `Teacher with id ${course.teacher} not found`,
        status: 404,
      };
    }
    return Course.create(course);
  }

  function find_all() {
    return Course.find().exec();
  }

  function find(info) {
    return Course.find(info).exec();
  }

  return {
    create,
    find_all,
    find,
    class: Course,
  };
}
