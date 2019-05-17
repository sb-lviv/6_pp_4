
module.exports = function(mongoose, Teacher) {
  const Schema = new mongoose.Schema({
    name: {
      type: String,
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
  });
  const Course = mongoose.model('Course', Schema);

  async function create(course) {
    return Course.create(course)
      .catch(e => {
        if (!e.errors) throw e;
        return {error: e.message};
      });
  }

  async function find_all() {
    return Course.find().exec();
  }

  async function find(info) {
    return Course.find(info).exec();
  }

  return {
    create,
    find_all,
    find,
    class: Course,
  };
}
