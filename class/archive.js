
module.exports = function(mongoose, Teacher, Course, Student) {
  const Schema = new mongoose.Schema({
    grade: {
      type: Number,
      required: [true, 'is required'],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'is required'],
      validate: async function(_id) {
        let [teacher] = await Teacher.find({_id});
        if (!teacher)
          throw new Error(`There is no teacher with id ${_id}`);
      },
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'is required'],
      validate: async function(_id) {
        let [course] = await Course.find({_id});
        if (!course)
          throw new Error(`There is no course with id ${_id}`);
      },
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'is required'],
      validate: async function(_id) {
        let [student] = await Student.find({_id});
        if (!student)
          throw new Error(`There is no student with id ${_id}`);
      },
    },
  });
  const Archive = mongoose.model('Archive', Schema);
  const ObjectId = mongoose.Types.ObjectId;

  async function create(record) {
    return Archive.create(record)
      .catch(e => {
        if (!e.errors) throw e;
        return {error: e.message};
      });
  }

  async function find_all() {
    return Archive.find().exec();
  }

  async function find(info) {
    return Archive.find(info).exec();
  }

  return {
    create,
    find_all,
    find,
    class: Archive,
  };
}
