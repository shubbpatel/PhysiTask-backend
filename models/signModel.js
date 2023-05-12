const mongoose = require("mongoose");
const validator = require("validator");

const signupSchema = new mongoose.Schema({
  googleId: { type: String },
  displayName: { type: String },
  email: { type: String, required: true },
  profileImage: {
    type: String,
    default: null,
  },
  fullName: { type: String },
  phone: { type: String },
  password: { type: String },
});

const Signup = mongoose.model("Signup", signupSchema);

module.exports = Signup;
