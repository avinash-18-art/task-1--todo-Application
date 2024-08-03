const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  loginTime: {
    type: Date,
    default: Date.now
  },
  logoutTime: {
    type: Date
  }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
