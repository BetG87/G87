const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps:true
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;