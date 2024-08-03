const Session = require('../models/Session');

// Retrieve all sessions for the logged-in user
exports.getSessions = async (req, res) => {
  const userId = req.user._id;
  try {
    const sessions = await Session.find({ userId });
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
