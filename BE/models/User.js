const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    numberPhone: {
        type: String,
        require: true,
        minlength: 8
    },
    fullName: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin','Sales' ],
        default: "User",
    },
    isActive: {
        type: Boolean,
        default: true,
    },   
    bankAccounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount',
    }],
    gameAccounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameAccount',
    }],
    gameProduct: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameProduct',
    }],
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
    },
},
    {
        timestamps:true
    })


    module.exports = mongoose.model("User", userSchema)