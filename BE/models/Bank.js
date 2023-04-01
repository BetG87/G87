const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    note: {
        type: String,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
    },
});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;