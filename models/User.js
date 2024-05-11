const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    userPfp: {
      type: String,
      default: 'https://cdn.discordapp.com/embed/avatars/0.png'
    },
    admin: {
      type: Boolean,
      default: false
    }
  }
)

module.exports = mongoose.model('User', userSchema);