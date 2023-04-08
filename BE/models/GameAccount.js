const mongoose = require('mongoose');

const gameAccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  gameProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameProduct',
  },
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
    },
},
{
    timestamps:true
});

const GameAccount = mongoose.model('GameAccount', gameAccountSchema);

module.exports = GameAccount;