const mongoose = require('mongoose');

const linkGameSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    linkGame: {
        type: String,
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
    },
},
{
    timestamps:true
});

const LinkGame = mongoose.model('LinkGame', linkGameSchema);

module.exports = LinkGame;