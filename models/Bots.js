const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const botSchema = new mongoose.Schema(
  {
    botId: {
      type: String,
      unique: true
    },
    access: {
      type: String,
      default: 'public',
    },
    token: {
      type: String
    },
    botAccess: {
      type: [String],
      default: ['']
    },
    serverAccess: {
      type: [String],
      default: ['']
    }
  }
)

botSchema.pre('save', async () => {
  const salt = await bcrypt.genSalt(10);
  botSchema.token = await bcrypt.hash(botSchema.token, salt);
})

module.exports = mongoose.model('Bots', botSchema);