
function toArray(object) {
  if (object instanceof Array) return object;
  else return [object];
}

module.exports = function(mongoose, Course) {
  const Schema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'is required'],
    },
    courses: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      validate: {
        validator: async function([...ids]) {
          let courses = await Course.find({_id: {$in: ids}});
          for (let {_id} of courses) {
            ids.splice(ids.indexOf(_id), 1);
          }
          if (ids.length > 0)
            throw new Error(`There are no courses with ids ${ids.join()}`);
        },
        message: props => props.reason.message,
      },
    },
  });
  const Student = mongoose.model('Student', Schema);

  async function create(student) {
    return Student.create(student)
      .catch(e => {
        if (!e.errors) throw e;
        return {error: e.message};
      });
  }

  async function find_all() {
    return Student.find().exec();
  }

  async function find(info) {
    return Student.find(info).exec();
  }

  async function attend_course(student_id, course_ids) {
    let student = await Student.findOne({_id: student_id});
    if (!student || !student._id) {
      return {
        error: `There is no student with id ${student_id}`,
      };
    }
    return Student.updateOne(
        {_id: student_id},
        {$addToSet: {courses: {$each: toArray(course_ids)}}},
        {runValidators: true},
    );
  }

  return {
    create,
    find_all,
    find,
    attend_course,
    class: Student,
  };
}
