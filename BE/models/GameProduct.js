const mongoose = require('mongoose');

const gameProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    linkImage: {
        type: String,
    },
    linkGame: {
        type: String,
    },
    note: {
        type: String,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
    },
});

const GameProduct = mongoose.model('GameProduct', gameProductSchema);

module.exports = GameProduct;