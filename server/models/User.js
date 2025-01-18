const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  
    console.log('Hashed Password:', this.password); // Debug log
    next();
  });
  

// Compare input password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    console.log('Entered matchPasswrd Function')
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    if (!isMatch) {
      console.log('Password mismatch');
    }
    console.log('Password matched');
    return isMatch;
  };
  

module.exports = mongoose.model('User', userSchema);
