const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const supabase = require('../config/supabase');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Register the user with Supabase
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // Hash the password for MongoDB storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document in MongoDB
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Authenticate the user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Find the user in MongoDB
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
