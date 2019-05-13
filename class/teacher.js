
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

  return {
    create,
    find_all,
    class: Teacher,
  };
}
