const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
    bankAccountNumber: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    bankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
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

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;