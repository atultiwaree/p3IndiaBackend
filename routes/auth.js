const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Dummy login with no encryption (add bcrypt for production)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' }).status(400);

  const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1d' });
  return res.json({ token, userId : user?._id, role : user?.role}).status(200);
});


// ✅ Add User Endpoint with passphrase protection
router.post('/add-user', async (req, res) => {
  const { email, password, role, passphrase } = req.body;

  // Validate required fields
  if (!email || !password || !role || !passphrase) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Check passphrase
  if (passphrase !== "p3India") {
    return res.status(403).json({ message: 'Invalid passphrase' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Save new user
  try {
    const newUser = new User({ email, password, role });
    let x = await newUser.save();
    console.log(x)
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
