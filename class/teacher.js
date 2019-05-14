
module.exports = function(mongoose) {
  const Schema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'is required'],
    },
  });
  const Teacher = mongoose.model('Teacher', Schema);

  async function create(teacher) {
    return Teacher.create(teacher)
      .catch(e => {
        if (!e.errors) throw e;
        return {error: e.message};
      });
  }

  async function find_all() {
    return Teacher.find().exec();
  }

  async function find(info) {
    return Teacher.find(info).exec();
  }

  return {
    create,
    find_all,
    find,
    class: Teacher,
  };
}
