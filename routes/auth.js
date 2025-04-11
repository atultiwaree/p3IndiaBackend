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

module.exports = router;
