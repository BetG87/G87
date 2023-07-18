const mongoose = require('mongoose');

const QrSchema = new mongoose.Schema({
    count: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    domain: {
        type: String,
    },
    note: {
        type: String,
    }
},
{
    timestamps:true
});

const Qr = mongoose.model('Qr', QrSchema);

module.exports = Qr;