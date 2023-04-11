// routes/user.js

const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Route to get the current user
router.get('/me', isAuthenticated, (req, res) => {
  const user = {
    id: req.user._id,
    displayName: req.user.displayName,
    email: req.user.email,
  };
  res.json(user);
});

module.exports = router;
