const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;

    const newSession = new Session({
      userId: user._id,
      ipAddress: req.ip,
      loginTime: new Date()
    });

    await newSession.save();

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth;
