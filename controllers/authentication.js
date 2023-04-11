const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/signModel');
const add = require('../index');
const Signup = require('../models/signModel');
// const cors = require("cors");
// const corsOptions = {
//     origin: 'http://localhost:3000'
//   };

const app = express();
// app.use(cors(corsOptions));

// Connect to MongoDB database
// mongoose.connect('mongodb://localhost:27017/physitask', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(()=> {
//     console.log('mongodb is up')
// }).catch((err) => {
//     console.log(err)
// });

// // Middleware to parse JSON data in request body
// app.use(express.json());


// // Route to handle user sign up
// app.post('/signup', async (req, res) => {

//     const user = new Signup(req.body);
//     console.log(req.body);
//   try {
//     const { firstName, lastName, email, password } = req.body;
// console.log(req.body);
//     // Check if email already exists in the database
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already in use' });
//     }

//     // Hash password using bcrypt
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user with hashed password
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });

//     // Save new user to the database
//     await newUser.save();

//     // Return success response
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

app.get('/signup', (req,res)=>{
    res.send('<h1>sisxsdgnup</h1>')
})
// app.listen(4000, () => {
//   console.log('Server listening on port 4000');
// });
