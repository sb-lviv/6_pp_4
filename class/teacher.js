
module.exports = function(mongoose) {
  const Schema = new mongoose.Schema({
    name: String,
  });
  const Teacher = mongoose.model('Teacher', Schema);

  async function create(teacher) {
    return Teacher.create(teacher);
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
