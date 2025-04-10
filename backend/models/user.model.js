const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  usermail: String,
  usercontact: { type: String, unique: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  password: String,
});

module.exports = mongoose.model('User', userSchema);
