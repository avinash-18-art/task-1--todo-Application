const express = require('express');
const Session = require('../models/Session');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/sessions', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;