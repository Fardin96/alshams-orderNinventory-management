const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
