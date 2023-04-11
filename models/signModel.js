const mongoose = require("mongoose");
const validator = require('validator');
const cors = require('cors')

const signupSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  profileImage: {
    type: String,
    default: null
  }

});

const Signup = mongoose.model("Signup", signupSchema);

module.exports = Signup;
