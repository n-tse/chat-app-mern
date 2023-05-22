const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

// user model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Field cannot be blank"]
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Field cannot be blank"],
    index: true,
    validate: [isEmail, "invalid email"]
  },
  password: {
    type: String,
    required: [true, "Field cannot be blank"],
  },
  picture: {
    type: String,
  },
  newMessages: {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    default: "online"
  }
}, {minimize: false}); // minimize 'false' allows default empty objects


// create user model from user schema
const User = mongoose.model("User", UserSchema);

module.exports = User;