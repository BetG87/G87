const Notification = require('../models/Notification')
const notificationController = {
    addNotification: async (req, res) => {
        try {
            const newNotification = new Notification(req.body);
            const savedNotification = await newNotification.save();
            return res.status(200).json(savedNotification);
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getAllNotification: async (req, res) => {
        try {
            const notification = await Notification.find();
            return res.status(200).json(notification)
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }

    },
    getById: async (req, res) => {
        try {
            const notification = await Notification.findById(req.params.id);
            return res.status(200).json(notification);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateNotification: async (req, res) => {
        try {
            const notification = await Notification.findById(req.body._id);
            await notification.updateOne({ $set: req.body });
            return res.status(200).json("Update successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteNotification: async (req, res) => {
        try {
            const notification = await Notification.findByIdAndDelete(req.body._id);
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = notificationController;