const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps:true
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;