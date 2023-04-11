const express = require("express");
const router = express.Router();
const Signup = require("../models/signModel");
const cors = require('cors')


router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const newSignup = new Signup({ firstName, lastName, email, password });
    await newSignup.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
