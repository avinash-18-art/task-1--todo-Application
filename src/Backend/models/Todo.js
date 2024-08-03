const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = ToDo;
