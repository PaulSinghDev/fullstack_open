const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    minlength: 3,
    required: true,
  },
})

module.exports = mongoose.model('User', userSchema)
