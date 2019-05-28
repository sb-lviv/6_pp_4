
module.exports = function(mongoose) {
  const Schema = new mongoose.Schema({
    grade: {
      type: Number,
      required: [true, 'is required'],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'is required'],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'is required'],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'is required'],
    },
  });
  const Archive = mongoose.model('Archive', Schema);
  const ObjectId = mongoose.Types.ObjectId;

  async function create(info) {
    let record = new Archive(info);
    try {
      await record.validate();
    } catch(e) {
      if (!e.errors) throw e;
      return {error: e.message};
    }

    return record.save({ validateBeforeSave: false });
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
