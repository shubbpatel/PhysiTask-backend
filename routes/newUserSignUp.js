const express = require("express");
// const newsignup = require("../models/newUser");
const signUpModel = require('../models/signModel');
const router = express.Router();
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post("/newuser", async (req, res) => {
  const { fullName, phone, email, password } = req.body;
  try {
    const existingUserByEmail = await signUpModel.findOne({ email: email });
    const existingUserByPhone = await signUpModel.findOne({ phone: phone });

    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    if (existingUserByPhone) {
      return res.status(400).json({ error: 'Phone number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUserSignup = new signUpModel({
      fullName: fullName,
      phone: phone,
      email: email,
      password: hashedPassword,
    });

    await newUserSignup.save();
res.sendStatus(200)
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
