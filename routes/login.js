// const express = require("express");
// // const newsignup = require("../models/newUser");
// const signUpModel = require('../models/signModel')
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// router.post('/newuserlogin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await signUpModel.findOne({ email: email });

//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ message: 'Incorrect password' });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.json({
//             message: 'Logged in successfully',
//             token: token,
//         });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;