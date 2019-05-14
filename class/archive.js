
module.exports = function(mongoose, Teacher, Course, Student) {
  const Schema = new mongoose.Schema({
    grade: Number,
    teacher: mongoose.Schema.Types.ObjectId,
    course:  mongoose.Schema.Types.ObjectId,
    student: mongoose.Schema.Types.ObjectId,
  });
  const Archive = mongoose.model('Archive', Schema);
  const ObjectId = mongoose.Types.ObjectId;

  async function create(record) {
    return Archive.create(record);
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
