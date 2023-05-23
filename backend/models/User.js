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

// before saving user, we want to hash/hide the password
UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    })
  })
})

// send back the user without the password
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

UserSchema.statics.findByCredentials = async function(email, password) {
  const user = await User.findOne({email});
  if (!user) throw new Error("invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("invalid email or password");
  return user;
}


// create user model from user schema
const User = mongoose.model("User", UserSchema);

module.exports = User;