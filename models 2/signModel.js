const mongoose = require("mongoose");
const validator = require('validator');
const cors = require('cors')

const signupSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email id already present"],
    validate(value){
        if(!validator.isEmail(value)){
            throw Error('invalid email')
        }
    }
  },
  password: {
    type: String,
    required: true
  }
});

const Signup = mongoose.model("Signup", signupSchema);

module.exports = Signup;
