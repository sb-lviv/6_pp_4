
module.exports = function(mongoose) {
  const Schema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'is required'],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'is required'],
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
