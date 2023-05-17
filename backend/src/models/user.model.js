const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required:  true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    currentLoginToken: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  })
  
  userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET, { expiresIn: '120s'})
    return token;
  }
   
  const userModel = mongoose.model('User', userSchema)
  
  module.exports = userModel