const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal'],
        required: true,
    },
    bankAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount',
    },
    bankAccountAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    gameProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameProduct',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    note: {
        type: String,
    },
},
{
    timestamps:true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
