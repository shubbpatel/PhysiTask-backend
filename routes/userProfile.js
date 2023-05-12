const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/signModel');

router.get('/userprofile', async (req, res) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token and get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user's profile information
    res.json({
      _id: user._id,
      displayName: user.displayName,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      profileImage: user.profileImage,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;

