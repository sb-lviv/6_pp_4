
module.exports = function(mongoose) {
  const Schema = new mongoose.Schema({
    name: String,
  });
  const Teacher = mongoose.model('Teacher', Schema);

  function create(teacher) {
    return Teacher.create(teacher);
  }

  function find_all() {
    return Teacher.find().exec();
  }

  function find(info) {
    return Teacher.find(info).exec();
  }

  return {
    create,
    find_all,
    find,
    class: Teacher,
  };
}
